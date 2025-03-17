/**
 * Base Environment Variable
 */
export const env = import.meta.env;

/**
 * Check if the application is running in development mode
 */
export const isDev = env.DEV;

/**
 * Check if the application is running in production mode
 */
export const isProd = env.PROD;

/**
 * Check if the application is running in test mode
 */
export const apiUrl = env.VITE_API_URL;
