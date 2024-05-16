import jwt from 'jsonwebtoken';
import { LIMIT_KEY, TOKEN_KEY } from '../constans.js';
import rateLimit from 'express-rate-limit';

export const verifyToken = (req, res, next) => {
  const { Token } = req.cookies

  if (!Token) {
    return res.status(401).send('Token required');
  }

  jwt.verify(Token, TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(403).send("Token invalido");
    }
    req.user = user;
    next();
  });
};

export const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: " maximo numero de intentos"
})



