import * as dotenv from 'dotenv';

/**
 * Load variables from .env.
 */
dotenv.config()

/**
 * Environment.
 */
export const nodeEnv = <string>process.env['NODE_ENV'];

/**
 * HTTP server port.
 */
export const port = parseInt(<string>process.env['PORT']);

/**
 * Database Connection.
 */
export const avilaTekDB = <string>process.env['AVILA_TEK_DB'];


/**
 * JWT Secret.
 */
export const jwtSecret = <string>process.env['JWT_SECRET'];


/**
 * Accepted origins
 */
export const acceptedOrigins = <string[]><unknown>process.env['ORIGINS']?.split(',');