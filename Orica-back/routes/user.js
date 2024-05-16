import express from 'express';
import bcrypt from 'bcryptjs'
import { jwt } from '../utils/index.js';
import { contrellerUsers } from '../controllers/index.js';
import { verifyToken } from '../middleware/index.js';

const api = express.Router();

api.get('/user', verifyToken, async (req, res) => {
  const { Token } = req.cookies;

  if (!Token) {
    return res.status(401).json({ err: 'No Token' })
  }

  try {
    const result = jwt.decodeToken(Token)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

// list

api.get('/listRole', verifyToken, async (req, res) => {
  try {
    const result = await contrellerUsers.listRole()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/listStatus', async (req, res) => {
  try {
    const result = await contrellerUsers.listStatus()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/users', verifyToken, async (req, res) => {
  try {
    const result = await contrellerUsers.users()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/userRole', verifyToken, async (req, res) => {
  try {
    const result = await contrellerUsers.usersRole()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.put('/modifyUser', verifyToken, async (req, res) => {
  const { username, password, idrole, idstatus, idUser } = req.body;

  const trimmedUsername = username ? username.trim() : '';
  const trimmedPassword = password ? password.trim() : '';

  const salt = bcrypt.genSaltSync(10);

  if (!trimmedUsername && !trimmedPassword && !idrole && !idstatus) {
    console.log('All fields are undefined, empty, or only contain whitespace');
    return res.status(400).json('Bad Request: All fields are undefined, empty, or only contain whitespace');
  }

  try {
    if (!trimmedPassword && !trimmedUsername) {
      console.log('no password')
      await contrellerUsers.modifyUser(idrole, idstatus, idUser);
      return res.json('good');
    }

    if (!trimmedUsername) {
      const passwordHash = bcrypt.hashSync(trimmedPassword, salt)
      await contrellerUsers.modifyUser(idrole, idstatus, idUser);
      await contrellerUsers.modifyPassword(passwordHash, idUser);
      return res.json('good');
    }
    if (!trimmedPassword) {
      await contrellerUsers.modifyUser(idrole, idstatus, idUser);
      await contrellerUsers.modifyUsername(trimmedUsername, idUser);
      return res.json('good');
    }

    const passwordHash = bcrypt.hashSync(trimmedPassword, salt)
    await contrellerUsers.modifyUser(idrole, idstatus, idUser);
    await contrellerUsers.modifyUsername(trimmedUsername, idUser);
    await contrellerUsers.modifyPassword(passwordHash, idUser);
    return res.json('good');
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal Server Error');
  }
});

export const UserRoute = api