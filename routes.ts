/**
 * An array of the routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/menu", "/cart", "/checkout", "/new-verification"];

/**
 * An array of the routes that are used for authentication.
 * These routes redirect logged in users to /settings.
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register", "/error", "/reset", "/new-password"];

/**
 * The prefix for API authentication routes.
 * The routes that start with this prefix are used for API authentication purpose.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"

