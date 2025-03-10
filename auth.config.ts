/// NextAuth.js is a library that allows to add authentication to the application.

import type { NextAuthConfig } from 'next-auth';
 
/// the configuration options for NextAuth.js
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  /// Protecting the routes with Middleware.
  /// This will prevent users from accessing the users pages unless they are logged in
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnUsers = nextUrl.pathname.startsWith('/users');
      if (isOnUsers) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/users', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;