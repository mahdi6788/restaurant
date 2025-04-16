import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // Extend the User type returned by the authorize function
  interface User {
    id: string;
    name: string | null; // Allow null since Prisma fields can be nullable
    email: string;
    role?: "ADMIN" | "CUSTOMER";
  }

  // Extend AdapterUser to include role (used by PrismaAdapter)
  interface AdapterUser extends AdapterUser {
    role: "ADMIN" | "CUSTOMER";
  }

  // Extend the Session type to include custom fields
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      address?: string | null;
      phone?: string | null;
      role?: "ADMIN" | "CUSTOMER";
    } & DefaultSession["user"];
  }
}
