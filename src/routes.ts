/**
 * An array of routes that are accessibe to public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * An array of routes that are not accessibe to public
 * These routes require authentication
 * @type {string[]}
 */
export const privateRoutes: string[] = ["/cart", "/wishlist"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged-in users to /
 * @type {string[]}
 */
export const authRoutes: string[] = ["/login", "/register"];

/**
 * The prefix for api authentication routes
 * Routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_REDIRECT: string = "/";

