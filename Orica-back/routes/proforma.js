import express from 'express';
import { verifyToken } from '../middleware/index.js';
import { mail } from '../utils/nodemail.js';
import { jwt } from '../utils/jwt.js';
import { pdf } from '../utils/pdf.js';
import { controllerProforma, controllerQuote } from '../controllers/index.js';

const api = express.Router();

// counter

api.get('/totalProforma', verifyToken, async (req, res) => {
  try {
    const result = await controllerProforma.counterTotalProforma()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

// proforma

api.get('/proformaProducts/:idProforma', verifyToken, async (req, res) => {
  const { idProforma } = req.params
  try {
    const quote = await controllerProforma.quoteId(idProforma)
    const data = await controllerQuote.products(quote[0].idquote)
    res.status(200).json(data)
  } catch {
    res.status(404)
  }
})

api.get('/proforma/:idQuote', verifyToken, async (req, res) => {
  const { idQuote } = req.params
  try {
    const result = await controllerProforma.proforma(idQuote)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/proforma', verifyToken, async (req, res) => {
  try {
    const result = await controllerProforma.allProformas()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/proformaCustomer', verifyToken, async (req, res) => {
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCustumer = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerProforma.proformaCustomer(idCustumer[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})


api.get('/proformaTaxes/:quote', verifyToken, async (req, res) => {
  const { quote } = req.params

  try {
    const result = await controllerProforma.taxes(quote)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})


// sendProforma

api.post('/reSendProforma', verifyToken, async (req, res) => {
  const { email } = req.body

  try {
    let link = ''
    const typeEmail = 'sendQuoteReview'
    const subject = 'Proforma Create'

    const result = await mail.sendEmail(email, link, typeEmail, subject)
    res.status(200).json({ "Message": `Mail sent to ${result}` })
  } catch (err) {
    console.log('El error es:', err);
    res.status(500).json({ "Message": `Error to set email` });
  }
})

api.post('/sendProforma', verifyToken, async (req, res) => {
  const { quote, paganName, PaganLastName, bank, accountNumber, products, taxes } = req.body
  const idCustomer = await controllerQuote.custormerIdQuote(quote)

  const promises = products.map(async product => {
    const total = product.price * product.quantity;
    try {
      await controllerQuote.updatePriceProducts(product.quantity, product.price, total, product.product, quote)
    } catch (err) {
      console.log(err)
    }
  });

  await Promise.all(promises);

  try {
    const subtotal = parseInt(await controllerQuote.subtotal(quote))
    const totalTaxes = subtotal * taxes
    const total = subtotal + totalTaxes
    const status = 4;
    await controllerQuote.updateTotalQuote(status, subtotal, totalTaxes, total, quote)
  } catch (err) {
    console.log(err)
  }

  try {
    const exists = await controllerProforma.existsProform(quote, paganName, PaganLastName, bank, accountNumber)
    if (exists.length <= 0) {
      await controllerProforma.sendProforma(quote, paganName, PaganLastName, bank, accountNumber)
    } else {
      await controllerProforma.updateProforma(quote, paganName, PaganLastName, bank, accountNumber, exists[0].id)
    }
  } catch (err) {
    console.log(err)
  }

  try {
    let link = ''
    const typeEmail = 'sendQuoteReview'
    const subject = 'Proforma Create'
    const emailCustomer = await controllerQuote.email(idCustomer[0].idcustumer)

    const result = await mail.sendEmail(emailCustomer[0].email, link, typeEmail, subject)
    res.status(200).json({ "Message": `Mail sent to ${result}` })
  } catch (err) {
    console.log('El error es:', err);
    res.status(500).json({ "Message": `Error to set email` });
  }
})


api.get("/proformaPdf/download/:quote", async (req, res) => {
  const { quote } = req.params

  const proforma = await controllerProforma.proformaId(quote)
  const dataProforma = await controllerProforma.proforma(proforma[0].id)
  const data = await controllerQuote.products(quote)

  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=quote.pdf",
  });

  pdf.buildProForma(res, data, dataProforma);
})

api.get("/proformaPdf/download/proforma/:proforma", async (req, res) => {
  const { proforma } = req.params

  const quote = await controllerProforma.quoteId(proforma)
  const dataProforma = await controllerProforma.proforma(proforma)
  const data = await controllerQuote.products(quote[0].idquote)

  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=quote.pdf",
  });

  pdf.buildProForma(res, data, dataProforma);
})

export const ProformaRoutes = api

