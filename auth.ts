import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { prisma } from "./app/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserbyEmail, getUserbyId } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { cookies } from "next/headers";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", ///when using prisma, we cannot use the database session, because prisma does not work in the edge.
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      /// 0. Quest    
        const guestCartId = cookies().get("guestCartId")?.value;
        if (guestCartId) {
          const guestCart = await prisma.cart.findUnique({
            where: { id: guestCartId },
            include: { items: { include: { menuItem: true } } },
          });
          if (guestCart && guestCart.items.length > 0) {
            const userCart = await prisma.cart.findUnique({
              where: { userId: user.id },
              include: { items: { include: { menuItem: true } } },
            });
            if (userCart) {
              // Merge items into existing user cart
              await prisma.cartItem.createMany({
                data: guestCart.items.map((item) => ({
                  cartId: userCart.id,
                  menuItemId: item.menuItemId,
                  quantity: item.quantity,
                })),
                skipDuplicates: true,
              });
              await prisma.cart.delete({ where: { id: guestCartId } });
            } else {
              // Assign guest cart to user
              await prisma.cart.update({
                where: { id: guestCartId },
                data: { userId: user.id },
              });
            }
            cookies().delete("guestCartId");
          }
          return true
        }
      /// 1. OAuth provider:
      if (account?.provider !== "credentials") {
        if (!profile?.email) throw new Error("No Profile");
        /// if there is user already, just update the name, otherwise the user is the new, that should be created
        await prisma.user.upsert({
          where: { email: profile.email },
          update: { name: profile.name },
          create: { email: profile.email, name: profile.name, image:profile.picture, role: "CUSTOMER" },  /// default role for customers that come from google
        });
        /// Allow OAuth without email verification
        return true;
      }

      /// credential provider: needs the verification
      const existingUser = await getUserbyId(user.id as string);

      /// prevent signIn without email verification
      if (!existingUser || !existingUser.emailVerified) return false;

      /// if the user make the 2FA option enable, twoFactorConfirmation should be true to allow sign in:
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;

        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.email) return token;
      const existingUser = await getUserbyEmail(token.email as string);
      if (!existingUser) return token;
      token.id = existingUser.id;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.address = existingUser.address;
      token.phone = existingUser.phone;
      token.role = existingUser?.role;

      // console.log("JWT callback - Token:", token);
      return token;
    },

    async session({ token, session }) {
      try {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as "ADMIN" | "CUSTOMER";
        session.user.address = token.address as string;
        session.user.phone = token.phone as string;
        // console.log("Session callback - Session:", session);
        return session;
      } catch (error) {
        console.error("Error is session callback: ", error);
        throw error;
      }
    },
  },
});
