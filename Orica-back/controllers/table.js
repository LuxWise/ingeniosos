import { data } from "../config/index.js"

export const test = async () => {
  const rows = await data.database.query(
    `
    SELECT
    id, email
    FROM usuarios 
    WHERE email = 'jcsanchez.martinez.2020@gmail.com'; 
    `,
  )
  return rows.rows
}

export const databaseTables = async () => {
  const rows = await data.database.query(
    `
    SELECT tablename 
    FROM pg_catalog.pg_tables 
    WHERE schemaname != 'pg_catalog' AND 
    schemaname != 'information_schema';
    `,
  )
  return rows.rows
}

export const table = async (table) => {
  const rows = await data.database.query(
    `
     SELECT * 
      FROM ${table}
    `
  );
  return rows.rows;
};

export const controllerTable = { test, databaseTables, table }
