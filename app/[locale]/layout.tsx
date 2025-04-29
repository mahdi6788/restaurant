import "../styles/globals.css";
import ClientProviders from "./ClientProviders";
import { SessionProvider } from "next-auth/react";
import Logo from "../components/Logo";
import { auth } from "@/auth";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { inter, amiri } from "../lib/fonts";

/// Readonly: to ensure type safety and immutability.
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  /// multilingual
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages({ locale });

  const session = await auth();
  return (
    <html
      lang={locale}
      className={`${locale === "en" ? inter.className : amiri.className}`}
    >
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SessionProvider session={session}>
            <ClientProviders>
              <Logo />
              {children}
            </ClientProviders>
          </SessionProvider>
        </NextIntlClientProvider>
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
