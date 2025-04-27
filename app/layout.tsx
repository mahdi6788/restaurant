import "../app/styles/globals.css";
import { Inter } from "next/font/google";
import ClientProviders from "./ClientProviders";
import { SessionProvider } from "next-auth/react";
import Logo from "./[locale]/components/Logo";
import { auth } from "@/auth";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

/// Readonly: to ensure type safety and immutability.
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
/// multilingual
let messages;
try {
  messages = (await import(`../../messages/${locale}.json`)).default;
} catch (error) {
  console.log(error)
  notFound();
}

  const session = await auth();
  return (
    <html  lang={locale} dir={locale === 'en' ? 'ltr' : 'rtl'} className={`${inter.className}`}>
      <body>
        <SessionProvider session={session}>
          <ClientProviders>
            <Logo />
            <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            </NextIntlClientProvider>
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
