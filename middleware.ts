/// as the prisma does not support the edge so we should use authConfig to extract auth

import NextAuth from "next-auth";
import authConfig from "./auth.config";
// import {
//   apiAuthPrefix,
//   authRoutes,
//   DEFAULT_LOGIN_REDIRECT,
//   publicRoutes,
// } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL('/login', req.nextUrl.origin)
    return (Response.redirect(newUrl))
  }

  // const { nextUrl } = req;

  // const isLoggedIn = !!req.auth;

  // const isApiAuthPrefix = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  // const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);

  // if (isApiAuthPrefix) return null;

  // if (isAuthRoutes) {
  //   if (isLoggedIn) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  //   return null;
  // }

  // if (!isLoggedIn && !isPublicRoutes) {
  //   return Response.redirect(new URL("/login", nextUrl));
  // }
  // return null;
});

export const config = {
  matcher: ["/users", "/profile", "/payment"], // Protect these routes
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], /// protect all routes except the favicon or static images.
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