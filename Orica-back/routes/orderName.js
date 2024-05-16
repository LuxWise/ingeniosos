import express from 'express';
import { verifyToken } from '../middleware/index.js';
import { divideController, orderNameController } from '../controllers/index.js';

const api = express.Router();

api.get('/ordernames', verifyToken, async (req, res) => {
  try {
    const result = await orderNameController.ordername()
    res.status(200).json(result)
  } catch {
    res.status(400)
  }
});

api.get('/ordernameDivisions', verifyToken, async (req, res) => {
  try {
    const result = await orderNameController.orderNameDivisions()
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error al procesar la solicitud');
  }
});


api.get('/ordernameDivisionsDetails/:orderName', verifyToken, async (req, res) => {
  const { orderName } = req.params
  try {
    const result = await orderNameController.orderNameDivisionsDetails(orderName)
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error al procesar la solicitud');
  }
});

api.post('/ordername', verifyToken, async (req, res) => {
  const { name, divides } = req.body;

  try {
    divides.map(async divide => {
      await orderNameController.order(name, divide);
      await divideController.selectOrderName(name, divide)
    })

    res.status(200).send('Operación completada con éxito');
  } catch (err) {
    console.log(err);
    res.status(400).send('Error al procesar la solicitud');
  }
});

api.put('/ordername', verifyToken, async (req, res) => {
  const { name, divides } = req.body;

  try {
    await orderNameController.modifyOrder(name);
    await divideController.modifyselectOrderName(name);

    const dividePromises = divides.map(async (divide) => {
      await orderNameController.order(name, divide);
      await divideController.selectOrderName(name, divide);
    });

    await Promise.all(dividePromises);
    res.status(200).send('Operación completada con éxito');
  } catch (err) {
    console.log(err);
    res.status(400).send('Error al procesar la solicitud');
  }
});



export const orderNameRoutes = api;
