import pg from 'pg';
import pgPromise from 'pg-promise';
import { DB_DATABASE, DB_HOST, DB_INTERNAL, DB_PASSWORD, DB_PORT, DB_USER } from '../constans.js';

const database = new pg.Pool({
  connectionString: DB_INTERNAL,
  // host: DB_HOST,
  // user: DB_USER,
  // password: DB_PASSWORD,
  // database: DB_DATABASE,
  // port: DB_PORT,
})

const connectionOptions = {
  connectionString: DB_INTERNAL,
  // host: DB_HOST,
  // port: DB_PORT,
  // database: DB_DATABASE,
  // user: DB_USER,
  // password: DB_PASSWORD,
};

const pgp = pgPromise();
const databasePromise = pgp(connectionOptions);

export const data = { database, databasePromise };
