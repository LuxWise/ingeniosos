import { data } from "../config/index.js"

//list

export const listRole = async () => {
  const result = await data.database.query(
    `
    SELECT id, typerole as name
    FROM role
    WHERE typerole != 'SuperAdmin'
    ORDER BY id;
    `, []
  )
  return result.rows
}

export const listStatus = async () => {
  const result = await data.database.query(
    `
    SELECT id, status	as name
    FROM userstatus
    ORDER BY id;
    `, []
  )
  return result.rows
}

// users

export const usersExists = async (name, lastname, email) => {
  const result = await data.database.query(
    `
    SELECT id
    FROM users
    WHERE name = $1  
    AND lastname = $2
    AND email = $3
    `, [name, lastname, email]
  )
  return result.rows
}

export const users = async () => {
  const result = await data.database.query(
    `
    SELECT users.id, users.name, users.lastname, role.typerole AS role, 
    users.email, userstatus.status
    FROM users
    INNER JOIN role ON role.id = users.idrole
    INNER JOIN userstatus ON userstatus.id = users.idstatus
    WHERE users.idrole != 1
    ORDER BY users.id;
    `, []
  )
  return result.rows
}

export const usersRole = async () => {
  const result = await data.database.query(
    `
    SELECT id, typerole as name
    FROM role
    ORDER BY id;
    `, []
  )
  return result.rows
}

// insert
export const addUser = async (name, lastname, username, password, email, idrole) => {
  const result = await data.database.query(
    `
    INSERT INTO users (name, lastname, username, password, email, idrole, idstatus)
    VALUES ($1, $2, $3, $4, $5, $6, 1)
    `, [name, lastname, username, password, email, idrole]
  )
  return result.rows
}

// update 
export const modifyUser = async (idrole, idstatus, idUser) => {
  const result = await data.database.query(
    `
    UPDATE users SET idrole = $1, idstatus = $2 
    WHERE id = $3;
    `, [idrole, idstatus, idUser]
  )
  return result.rows
}

export const modifyPassword = async (password, idUser) => {
  const result = await data.database.query(
    `
    UPDATE users SET password = $1 
    WHERE id = $2;
    `, [password, idUser]
  )
  return result.rows
}

export const modifyUsername = async (username, idUser) => {
  const result = await data.database.query(
    `
    UPDATE users SET username = $1 
    WHERE id = $2;
    `, [username, idUser]
  )
  return result.rows
}

export const contrellerUsers = {
  listRole,
  listStatus,
  usersExists,
  users,
  usersRole,
  addUser,
  modifyUser,
  modifyPassword,
  modifyUsername
}