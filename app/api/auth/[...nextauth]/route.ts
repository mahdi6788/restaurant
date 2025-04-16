import { handlers } from "@/auth"
export const { GET, POST } = handlers







// import { prisma } from "@/app/lib/prisma";
// import bcrypt from "bcryptjs";
// import NextAuth, {  User, AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { cookies } from "next/headers";

// // Extend the NextAuth Session and User type to include custom fields
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string | undefined;
//       name: string | null;
//       email: string | null;
//       address?: string | null;
//       phone?: string | null;
//     };
//   }
//   interface User {
//     id: string | undefined;
//     name: string | null;
//     email: string | null;
//     password?: string | null;
//     address?: string | null;
//     phone?: string | null;
//     role?: string | null;
//     createdAt?: Date | null;
//     updatedAt?: Date | null;
//   }
// }

// /// configuration object including details like the authentication providers, session settings, and callbacks.
// export const authOptions: AuthOptions = {
//   // adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password are required");
//         }
//         /// check the user existance
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email as string },
//         });

//         if (!user || !user.password) {
//           throw new Error("No user found with this email");
//         }
//         /// password validation
//         const isValid = await bcrypt.compare(
//           credentials.password as string,
//           user.password
//         );
//         if (!isValid) throw new Error("Invalid password");

//         return { id: user.id, name: user.name, email: user.email };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",         
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//     updateAge: 24 * 60 * 60, // update every 24 hours
//   },


//   callbacks: {
//     async jwt({token, user}){
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.address = user.address;
//         token.phone = user.phone;
//       }
//       console.log("JWT callback - Token:", token);
//       return token
//     },
//     async session({ session, token }) {
//       try {
//         session.user.id = token.id as string | undefined;
//         session.user.name = token.name as string | null;
//         session.user.email = token.email as string | null;
//         session.user.address = token.address as string | null;
//         session.user.phone = token.phone as string | null;
//         console.log("Session callback - Session:", session);
//         return session;
//       } catch (error) {
//         console.error("Error is session callback: ", error);
//         throw error;
//       }
//     },
    
//     async signIn({ user }: { user: User }) {
//       try {
//         // console.log("SignIn callback - User:", user);
//         // const session = await prisma.session.findMany({
//         //   where:{userId: user.id}
//         // })
//         // console.log("session from token: ", session)
//         // Merge guest cart with user cart on login
//         const guestCartId = cookies().get("guestCartId")?.value;
//         if (guestCartId) {
//           const guestCart = await prisma.cart.findUnique({
//             where: { id: guestCartId },
//             include: { items: { include: { menuItem: true } } },
//           });
//           if (guestCart && guestCart.items.length > 0) {
//             const userCart = await prisma.cart.findUnique({
//               where: { userId: user.id },
//               include: { items: { include: { menuItem: true } } },
//             });
//             if (userCart) {
//               // Merge items into existing user cart
//               await prisma.cartItem.createMany({
//                 data: guestCart.items.map((item) => ({
//                   cartId: userCart.id,
//                   menuItemId: item.menuItemId,
//                   quantity: item.quantity,
//                 })),
//                 skipDuplicates: true,
//               });
//               await prisma.cart.delete({ where: { id: guestCartId } });
//             } else {
//               // Assign guest cart to user
//               await prisma.cart.update({
//                 where: { id: guestCartId },
//                 data: { userId: user.id },
//               });
//             }
//             cookies().delete("guestCartId");
//           }
//         }
//         return true;
//       } catch (error) {
//         console.error("Error in signIn callback: ", error);
//         return true; // Allow sign-in even if cart merging fails
//       }
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   events: {
//     async session({ session }) {
//       console.log("Session event - Final session sent:", session);
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// /*
// /// to map the providers and return the id and name of the provider
// export const providerMap = config.providers
//   .map((provider) => {
//     if (typeof provider === "function") {
//       const providerData = provider();
//       return { id: providerData.id, name: providerData.name };
//     } else {
//       return { id: provider.id, name: provider.name };
//     }
//   })
//   .filter((provider) => provider.id !== "credentials");
// */
