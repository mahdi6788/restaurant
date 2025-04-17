/// as the prisma does not support the edge so we should use authConfig to extract auth

import { NextRequest, NextResponse } from "next/server";
import {getToken} from "next-auth/jwt"


export default async function middleware(req:NextRequest) {
  // Get the token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  })
  // If no token and not on login page, redirect to login
  if (!token && req.nextUrl.pathname !== "/login") {
    let callbackUrl = req.nextUrl.pathname
    if(req.nextUrl.search) callbackUrl += req.nextUrl.search
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    const loginUrl = new URL(`/login?callback=${encodedCallbackUrl}`, req.nextUrl.origin)
    return (NextResponse.redirect(loginUrl))
  }
  // Allow the request to proceed if token exists or on login page
  return NextResponse.next()
};

export const config = {
  matcher: ["/users/:path*"] // Protect users route and its subroutes
};


/* to prevent customer from admin domain
callbacks: {
    authorized: ({ req, token }) => {
      const pathname = req.nextUrl.pathname;
      if (pathname.startsWith("/admin")) {
        return token?.role === "ADMIN"; // Only allow admins to /admin routes
      }
      return !!token; // Allow authenticated users to other routes
    },
  },
*/