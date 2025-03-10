///// Authentication logic /////

import NextAuth from "next-auth";
import { authConfig } from "../../auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUser } from "./data";
// import bcrypt from "bcrypt"

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          /// best practice: use bcrypt but in the database password should be stored in crypted key
          // const passwordMatch = await bcrypt.compare(password, user.password)
          const passwordMatch = password === user.password;

          if (passwordMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              // add other user properties if needed
            };
          }
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
