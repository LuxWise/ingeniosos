import dotenv from "dotenv";

dotenv.config();

// jwt
export const TOKEN_KEY = process.env.TOKEN_KEY;

// limit 
export const LIMIT_KEY = process.env.LIMIT_KEY;

// database
export const DB_INTERNAL = process.env.DB_INTERNAL;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = process.env.DB_PORT;


// server
export const IP_SERVER = process.env.IP_SERVER;
export const PORT = process.env.PORT || 8080;

// gmail 
export const GMAIL = process.env.GMAIL;
export const GMAIL_KEY = process.env.GMAIL_KEY;

// outlook 
export const OUTLOOKMAIL = process.env.OUTLOOKMAIL;
export const OUTLOOKMAIL_KEY = process.env.OUTLOOKMAIL_KEY;

// mailchimp
export const MAILCHIMP_USERNAME = process.env.MAILCHIMP_USERNAME
export const MAILCHIMP_PASSWORD = process.env.MAILCHIMP_PASSWORD
export const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
export const SERVER_PREFIX = process.env.SERVER_PREFIX
