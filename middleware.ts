/// as the prisma does not support the edge so we should use authConfig to extract auth

import { NextRequest, NextResponse } from "next/server";
import {getToken} from "next-auth/jwt"
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';


const locales = ['en', 'fa', 'ar'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  /// Detects the user’s preferred language from the Accept-Language header
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
  
}

export default async function middleware(req:NextRequest) {
  const pathname = req.nextUrl.pathname
  // Get the token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    // specify the cookie name based on the environment
    cookieName: process.env.VERCEL_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token",
  });


  // If no token and not on login page, redirect to login
  if (!token && pathname !== "/login") {
    let callbackUrl = pathname
    if(req.nextUrl.search) callbackUrl += req.nextUrl.search
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    const loginUrl = new URL(`/login?callback=${encodedCallbackUrl}`, req.nextUrl.origin)  
    return (NextResponse.redirect(loginUrl))
  }

  /// 
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  const locale = getLocale(req);
  req.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(req.nextUrl);        /// Redirects to the appropriate locale (e.g., /en, /fa, /ar).


}


export const config = {
  matcher: ["/users/:path*"] // Protect users route and its subroutes
};
