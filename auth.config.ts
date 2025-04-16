import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./app/lib/prisma";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        /// check the user existance
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("No user found with this email");
        }
        /// password validation
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
} satisfies NextAuthConfig;
