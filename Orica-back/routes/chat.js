import express from 'express';
import { verifyToken } from '../middleware/index.js';
import axios from 'axios';

const api = express.Router();

api.post('/chat', verifyToken, async (req, res) => {
  const { question } = req.body
  try {
    const result = await axios.post(`https://chatorica-production.up.railway.app/apiChatbot`, {
      question: `${question}`
    });
    res.status(200).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Error fetching data' });
  }
});

export const chatRoutes = api;

