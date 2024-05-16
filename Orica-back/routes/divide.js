import express from 'express';
import { verifyToken } from '../middleware/index.js';
import { divideController } from '../controllers/index.js';

const api = express.Router();

api.get('/ports', verifyToken, async (req, res) => {
  try {
    const result = await divideController.ports()
    res.status(200).json(result)
  } catch {
    res.status(400)
  }
});

api.get('/divisions', verifyToken, async (req, res) => {
  try {
    const result = await divideController.divisions()
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(400)
  }
})

api.get('/modify/divisions', verifyToken, async (req, res) => {
  try {
    const result = await divideController.modifydivisions()
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(400)
  }
})

api.get('/divisions/:idQuote', verifyToken, async (req, res) => {
  const idQuote = req.params.idQuote
  try {
    const result = await divideController.division(idQuote)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(400)
  }
})

api.get('/divisionsPort/:port', verifyToken, async (req, res) => {
  const port = req.params.port
  try {
    const result = await divideController.divisionsPort(port)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(400)
  }
})

api.post('/divid', verifyToken, async (req, res) => {
  const { divid, quote } = req.body;

  try {
    divid.map(async item => {
      const product = item[1];
      item[0].map(async items => {
        const total = items.quantity * items.price;
        await divideController.divid(items.port, items.quantity, items.price, items.date, product, quote, total);
      });
    });

    res.status(200).send('Operación completada con éxito');
  } catch (err) {
    console.log(err);
    res.status(400).send('Error al procesar la solicitud');
  }
});

api.put('/divide', verifyToken, async (req, res) => {
  const { divide } = req.body

  try {
    await divideController.updateDivide(divide.quantity, divide.price, divide.date, divide.port, divide.id)
    res.status(200).send('Operación completada con éxito');
  } catch (err) {
    console.log(err)
  }
})

export const divideRoutes = api;
