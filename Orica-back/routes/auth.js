import express from 'express';
import bcrypt from 'bcryptjs'
import { limit, verifyToken } from '../middleware/index.js';
import { serialize } from 'cookie';
import { jwt, mail } from '../utils/index.js';
import { AuthController } from '../controllers/index.js';

const api = express.Router();

api.post('/login', async (req, res) => {
  const { user, password } = req.body

  try {
    const userExists = await AuthController.login(user)
    if (userExists.length > 0) {
      bcrypt.compare(password, userExists[0].password,
        async (bcryptError, check) => {
          if (bcryptError) {
            res.status(500).json({ Message: 'server error' })
          } if (!check) {
            res.status(400).json({ Message: 'invalid password' })
          } else {
            const name = userExists[0].name
            const lastname = userExists[0].lastname
            const role = userExists[0].role
            const email = userExists[0].email
            const id = userExists[0].id

            const serialized = serialize('Token', jwt.createAccessToken(name, lastname, role, id, email), {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              maxAge: 7200,
              path: '/'
            })
            res.status(200).setHeader('Set-Cookie', serialized).json({ status: 'login succes', role: role })
          }
        })
    } else {
      res.status(400).json({ Message: 'unknow user' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ Message: 'Error to get the information' })
  }
})

api.post('/recoverPassword', async (req, res) => {
  const { email } = req.body
  try {
    const emailExists = await AuthController.email(email)
    if (!emailExists.length > 0) {
      return res.status(400).json({ Message: 'unknow email' })
    }

    let link = ''
    const typeEmail = 'passwordRecover'
    const subject = 'Recover password'

    const result = await mail.sendEmail(email, link, typeEmail, subject)
    res.status(200).json({ "Message": `Mail sent to ${result}` })
  } catch (err) {
    console.log('El error es:', err);
    res.status(500).json({ "Message": `Error to set email` });
  }
})

api.post('/logout', async (req, res) => {
  const { Token } = req.cookies;

  if (!Token) {
    return res.status(401).json({ err: 'No Token' })
  }

  try {
    jwt.verifyToken(Token);
    const serialized = serialize('Token', null, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7200,
      path: '/'
    })
    res.status(200).setHeader('Set-Cookie', serialized).json('logout succes')
  } catch (err) {
    console.log(err)
    res.status(401).json('invalid Token')
  }
})

api.get('/cookie', async (req, res) => {
  const { Token } = req.cookies;

  if (!Token) {
    return res.status(401).json({ err: 'No Token' })
  }

  try {
    jwt.decodeToken(Token);
    res.status(200).json(Token)
  } catch (err) {
    console.log(err)
    res.status(400).json('invalid Token')
  }
})

export const AuthRoute = api 