/// as the prisma does not support the edge so we should use authConfig to extract auth

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

const locales = ["en", "fa", "ar"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  /// Handle locale redirection
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(req);
    req.nextUrl.pathname = `/${locale}${pathname || ""}`;
    return NextResponse.redirect(req.nextUrl);
  }

  // Skip middleware for login page to avoid redirect loops
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // Get the token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.VERCEL_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  // If no token and not on login page, redirect to login
  if (!token) {
    let callbackUrl = pathname;
    if (req.nextUrl.search) callbackUrl += req.nextUrl.search;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    const loginUrl = new URL(
      `/login?callback=${encodedCallbackUrl}`,
      req.nextUrl.origin
    );
    return NextResponse.redirect(loginUrl);
  }

 
  return NextResponse.next();
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/","/users/:path*", "/users(en|fa|ar)/:path*"],
  // matcher: ["/users/:path*"]
};
