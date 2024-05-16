import express from 'express';
import { controllerTable } from '../controllers/index.js';
import { verifyToken } from '../middleware/index.js';

const api = express.Router();

api.get('/test', async (req, res) => {
  try {
    const result = await controllerTable.test()
    res.status(200).json(result)
  } catch {
    res.status(500)
  }
})

api.get('/database/tables', verifyToken, async (req, res) => {
  try {
    const result = await controllerTable.databaseTables()
    res.status(200).json(result)
  } catch {
    res.status(500)
  }
})

api.get('/table/:name', verifyToken, async (req, res) => {
  const { name } = req.params

  try {
    const result = await controllerTable.table(name)
    res.status(200).json(result)
  } catch {
    res.status(500)
  }
})

export const TableRoute = api