import express from 'express';
import { mail } from '../utils/nodemail.js';
import { jwt } from '../utils/jwt.js';
import { controllerSupport } from '../controllers/support.js';
import { verifyToken } from '../middleware/index.js';

const api = express.Router();

api.get('/support/type/list', verifyToken, async (req, res) => {
  try {
    const result = await controllerSupport.listSupportType()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/requests', verifyToken, async (req, res) => {
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCustumer = await controllerSupport.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerSupport.requests(idCustumer[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})

api.get('/requests/:type', verifyToken, async (req, res) => {
  const { type } = req.params
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCustumer = await controllerSupport.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerSupport.requestsType(idCustumer[0].id, type)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(404)
  }
})

api.get('/allRequests', verifyToken, async (req, res) => {
  try {
    const result = await controllerSupport.allRequests()
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})

api.get('/totalRequests', verifyToken, async (req, res) => {
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCustumer = await controllerSupport.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerSupport.counterTotalRequest(idCustumer[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.post('/sendSupport', verifyToken, async (req, res) => {
  const { subjectSupport, description, type, supportType, supportStatus } = req.body
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCustumer = await controllerSupport.custormerId(info.name, info.lastname, info.email)

  try {
    await controllerSupport.sendSupport(subjectSupport, type, description, idCustumer[0].id, supportType, supportStatus)
  } catch (err) {
    console.log(err)
  }

  let link = { username: info.name, supportNumber: '' }
  const typeEmail = 'sendSupport'
  const subject = 'Request send'

  try {
    const result = await mail.sendEmail(info.email, link, typeEmail, subject)
    res.status(200).json({ "Message": `Mail sent to ${result}` })
  } catch (err) {
    console.log('El error es:', err);
    res.status(500).json({ "Message": `Error to set email` });
  }
})

export const supportRoute = api
