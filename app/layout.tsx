import "../app/styles/globals.css";
import { Inter } from "next/font/google";
import ClientProviders from "./ClientProviders";
import { SessionProvider } from "next-auth/react";
import Logo from "./components/Logo";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

/// Readonly: to ensure type safety and immutability.
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  return (
    <html lang="en" className={`${inter.className}`}>
      <body>
        <SessionProvider session={session}>
        <ClientProviders>
          <Logo />
          {children}
        </ClientProviders>
        </SessionProvider>
      </body>
    </html>
  );
}

/// a powerful way to define metadata in a server-friendly manner.
export const metadata = {
  icons: {
    icon: "/images/logo/LOGOico.ico",
  },
};

/* 
The current setup (server RootLayout + client ClientProviders + nested layouts) strikes the best balance for performance, maintainability, and compatibility.
Alternative approach:
Single Client-Side Layout:
To conditionally exclude the header and footer based on the route, keep everything in a single "use client" RootLayout with usePathname. 
This works but sends more JavaScript to the client and loses server-side rendering benefits. 
It’s simpler but less optimal for performance.
Verdict: Not best practice unless your app heavily relies on client-side interactivity everywhere.
 */
