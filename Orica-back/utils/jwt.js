import jsonwebtoken from 'jsonwebtoken';
import { TOKEN_KEY } from '../constans.js';

function createAccessToken(name, lastname, role, id, email) {
  const payload = {
    token_type: 'access',
    name: name,
    lastname: lastname,
    role: role,
    email: email,
    id: id,
  }
  return jsonwebtoken.sign(payload, TOKEN_KEY, { expiresIn: '2h' });
}

function createRefeshToken(name, lastname, role, id,) {
  const payload = {
    token_type: 'access',
    name: name,
    lastname: lastname,
    role: role,
    id: id,
  }
  return jsonwebtoken.sign(payload, TOKEN_KEY, { expiresIn: '10d' });
}

function createRecoverToken(id) {
  const payload = {
    id: id,
  }
  return jsonwebtoken.sign(payload, TOKEN_KEY, { expiresIn: '15m' });
}


function verifyToken(token) {
  const data = jsonwebtoken.verify(token, TOKEN_KEY)
  return data
}


function decodeToken(token) {
  const data = jsonwebtoken.decode(token)
  return data
}

export const jwt = { createAccessToken, createRefeshToken, createRecoverToken, decodeToken, verifyToken }