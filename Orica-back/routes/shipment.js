import express from 'express';
import pgPromise from 'pg-promise';
import fileUpload from 'express-fileupload';
import readXlsxFile from 'read-excel-file/node';
import { data } from '../config/index.js';
import { verifyToken } from '../middleware/index.js';
import { contrellerShipment } from '../controllers/index.js';
import { mail } from '../utils/nodemail.js';
import { pdf } from '../utils/pdf.js';


const pgp = pgPromise({
  capSQL: true
});

const api = express.Router();

const uploadOpts = {
  useTempFiles: true,
  tempFileDir: '/tmp/'
}

function formatearFecha(fecha) {
  let fechaObj = new Date(fecha);

  let año = fechaObj.getUTCFullYear();
  let mes = fechaObj.getUTCMonth() + 1;
  let dia = fechaObj.getUTCDate();

  const fechaFormateada = `${año} ${mes.toString().padStart(2, '0')} ${dia.toString().padStart(2, '0')}`;

  return fechaFormateada
}

function convertirFechas(fechas) {
  const meses = {
    'ene': '01', 'feb': '02', 'mar': '03', 'abr': '04', 'may': '05', 'jun': '06',
    'jul': '07', 'ago': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dic': '12'
  };
  return fechas.split(' ').map(fecha => {
    const partes = fecha.split('-');
    return `20${partes[2]} ${meses[partes[1]]} ${partes[0]}`;
  });
}

function compararFechas(fechas) {
  const fechasConvertidas = convertirFechas(fechas);
  fechasConvertidas.sort((a, b) => a - b);

  const ultimaFecha = fechasConvertidas[fechasConvertidas.length - 1];
  return ultimaFecha
}


api.get('/shipments', verifyToken, async (req, res) => {
  try {
    const result = await contrellerShipment.shipment()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/shipment/:ship', verifyToken, async (req, res) => {
  const { ship } = req.params

  try {
    const result = await contrellerShipment.shipmentDetail(ship)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/shipment/search/:ship', verifyToken, async (req, res) => {
  const { ship } = req.params

  try {
    const result = await contrellerShipment.shipmentBilling(ship)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.post(`/shipment/send`, verifyToken, async (req, res) => {
  const { email, number } = req.body

  try {
    const typeEmail = 'sendShip';
    const subject = 'Shipping status';

    const result = await mail.sendEmail(email, number, typeEmail, subject);
    return res.status(200).json({ "Message": `Mail sent to ${result}` });

  } catch (err) {
    console.log('El error es:', err);
    return res.status(500).json({ "Message": `Error to set email` });
  }

})

api.post('/shipments/xlsx', fileUpload(uploadOpts), async (req, res) => {
  const schema = {
    'FUENTE': { prop: 'source', type: String, },
    'STATUS': { prop: 'status', type: String, },
    'SALIDA': { prop: 'departure', type: Date },
    'LLEGADA': { prop: 'arrive' },
    'BUQUE': { prop: 'vessel', type: String, },
    'COMENTARIO': { prop: 'comment', type: Date, },
    'CLIENTE': { prop: 'client', type: Date, },
    'PRODUCTO': { prop: 'product', type: String, },
    'PESO NETO': { prop: 'netweight', type: String, },
    'PESO GROSS': { prop: 'grossweigth', type: String, },
    'DESTINO': { prop: 'purpose', type: String, },
    'CONOCIMIENTO DE EMBARQUE': { prop: 'billoflading', type: String, },
    'POL': { prop: 'pol', type: String, },
    'POD': { prop: 'pod', type: String, },
  }
  const { excel } = req.files
  try {
    await contrellerShipment.remplace()
    const rows = await readXlsxFile(excel.tempFilePath, { sheet: 'Hoja', schema })
    const json = rows.rows

    json.map(item => {
      item.departure = formatearFecha(item.departure)

      typeof item.arrive == 'object' ?
        item.arrive = formatearFecha(item.arrive) :
        item.arrive = compararFechas(item.arrive)
    })


    for (const item of json) {
      {
        const query = pgp.helpers.insert(item, null, 'shipments');

        try {
          await data.databasePromise.none(query);
        } catch (error) {
          console.log(error);
        }
      }
    }
    res.status(200).json('good');


  } catch (err) {
    console.log(err)
    res.status(400).json('bad');
  }
})

api.get('/shipPdf', async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=quote.pdf",
  });

  pdf.buildShip(res);
})

export const shipmentsRoutes = api;

