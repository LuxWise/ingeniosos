import { data } from "../config/index.js"

export const login = async (user) => {
  const result = await data.database.query(
    `
    SELECT 
    users.name,
	  users.lastname,
    users.username,
	  users.password,
    users.email,
    role.typeRole AS role
    FROM users
    INNER JOIN role ON users.idRole = role.id
    WHERE username = $1 AND users.visible = true;
    `, [user]
  )
  return result.rows
}

export const email = async (email) => {
  const result = await data.database.query(
    `
    SELECT
    id, email
    FROM users 
    WHERE email = $1
    `, [email]
  )
  return result.rows
}

export const AuthController = { login, email }