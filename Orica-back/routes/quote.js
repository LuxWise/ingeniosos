import express from 'express';
import { verifyToken } from '../middleware/index.js';
import { AuthController, controllerQuote, quote } from '../controllers/index.js';
import { mail } from '../utils/nodemail.js';
import { jwt } from '../utils/jwt.js';
import { pdf } from '../utils/pdf.js';

const api = express.Router();

// list

api.get('/products/list', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.listProducts()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/Commercial/list', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.listCommercial()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

// quotes products

api.get('/quoteProducts/:quote', verifyToken, async (req, res) => {
  const { quote } = req.params

  try {
    const result = await controllerQuote.products(quote)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

// quotes

api.get('/quote', verifyToken, async (req, res) => {
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCustumer = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerQuote.quotes(idCustumer[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})

api.get('/quotes', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.quote()
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})

api.get('/quote/process', verifyToken, async (req, res) => {
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCustumer = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerQuote.quotesProcess(idCustumer[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})

// quotes commercial

api.get('/quoteCommercial', verifyToken, async (req, res) => {
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCommercial = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerQuote.quotesCommercial(idCommercial[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})

api.get('/quoteCommercial/all', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.quotesCommercialAll()
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})


api.get('/quoteCommercial/new', verifyToken, async (req, res) => {
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCommercial = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerQuote.quotesCommercialNew(idCommercial[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})

api.get('/quote/approve', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.quotesCommercial(idCommercial[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})

// quotes proforma

api.get('/quoteProforma', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.quotesProformaNew()
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})

api.get('/quote/:idQuote', verifyToken, async (req, res) => {
  const idQuote = req.params.idQuote;
  try {
    const result = await controllerQuote.quoteInfo(idQuote)
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})

//

api.get('/quotePending/:type', verifyToken, async (req, res) => {
  const { type } = req.params;
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCustumer = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerQuote.pending(type, idCustumer[0].id)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(404).json('error')
  }
})

api.get('/quotePendingCommercial/:type', verifyToken, async (req, res) => {
  const { type } = req.params;
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCommecial = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerQuote.pendingCommercial(type, idCommecial[0].id)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(404).json('error')
  }
})

api.get('/quotePendingCommercial', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.pendingAllCommercial()
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(404).json('error')
  }
})

api.get('/quotePendingApprove', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.pendingApproval()
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(404).json('error')
  }
})

// counters

api.get('/totalQuotes', verifyToken, async (req, res) => {
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCustumer = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerQuote.counterTotalQuotes(idCustumer[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/totalQuotes', verifyToken, async (req, res) => {
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCustumer = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerQuote.counterTotalQuotes(idCustumer[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/totalQuotesCommercial', verifyToken, async (req, res) => {
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCommercial = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerQuote.counterTotalQuotesCommercial(idCommercial[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/totalQuotesCommercial/all', verifyToken, async (req, res) => {

  try {
    const result = await controllerQuote.counterTotalQuotesCommercialAll()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/totalCommercial', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.counterQuotesCommercial()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/quotes/day', verifyToken, async (req, res) => {
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCommercial = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerQuote.counterDateQuotesCommercial(idCommercial[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/quotes/day/all', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.counterDateAllQuotesCommercial()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/quotesCommecial/new', verifyToken, async (req, res) => {
  const { Token } = req.cookies
  const info = jwt.decodeToken(Token)
  const idCommercial = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const result = await controllerQuote.counterOpenQuotesCommercial(idCommercial[0].id)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/quotesCommecial/new/all', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.counterOpenQuotesCommercialAll()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/quotesCommecial/complete', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.quotesCommercialComplete()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})


api.get('/quotesApprove', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.counterQuotesApprove()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/quotesPending', verifyToken, async (req, res) => {
  try {
    const result = await controllerQuote.counterQuotesPending()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/counterQuotes/:type', verifyToken, async (req, res) => {
  const { type } = req.params
  try {
    const result = await controllerQuote.counterNewQuotes(type)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

// send

api.post('/sendQuote', verifyToken, async (req, res) => {
  const { name, port, phone, observations, products, commercial, date } = req.body
  const { Token } = req.cookies

  const info = jwt.decodeToken(Token)
  const idCustumer = await controllerQuote.custormerId(info.name, info.lastname, info.email)

  try {
    const quoteExist = await controllerQuote.quoteExits(name, 1, port, phone)
    if (quoteExist.length > 0) {
      res.json({ Message: 'exits' })
      return;
    } else {
      await controllerQuote.sendQuote(name, 1, port, phone, observations, info.email, idCustumer[0].id, commercial, date)
    }
  } catch (err) {
    console.log(err)
  }

  products.forEach(async product => {
    try {
      const id = await controllerQuote.quoteId(name, port, phone, date);
      console.log(id);
      await controllerQuote.sendQuoteProduct(product.product, product.quantity, id[0].id);
    } catch (err) {
      console.log(err)
    }
  });

  try {
    let link = '';
    const typeEmail = 'sendQuoteCommercial';
    const subject = 'Quotation sent for review';

    await mail.sendEmail(info.email, link, typeEmail, subject);
  } catch (err) {
    console.log('El error es:', err);
    return res.status(500).json({ "Message": `Error to set email` });
  }

  try {
    let link = '';
    const typeEmail = 'sendQuote';
    const subject = 'Quotation sent';
    const emailCommercial = await controllerQuote.email(commercial);

    const result = await mail.sendEmail(emailCommercial[0].email, link, typeEmail, subject);
    return res.status(200).json({ "Message": `Mail sent to ${result}` });
  } catch (err) {
    console.log('El error es:', err);
    return res.status(500).json({ "Message": `Error to set email` });
  }

})

// sendForApproval

api.post('/sendQuoteReview', verifyToken, async (req, res) => {
  const { products, taxes, quote, divid } = req.body
  const idCustomer = await controllerQuote.custormerIdQuote(quote)

  function quantityPrice(array) {
    return array.reduce((acumulador, elementoActual) => {
      const cantidad = parseInt(elementoActual.quantity, 10);
      const precio = parseInt(elementoActual.price, 10) * cantidad;

      return {
        quantity: acumulador.quantity + cantidad,
        price: acumulador.price + precio
      };
    }, { quantity: 0, price: 0 });
  }

  try {
    const dividTotals = divid.map(item => quantityPrice(item[0]));

    products.forEach(async (product, index) => {
      if (index < dividTotals.length) {
        const total = dividTotals[index];
        await controllerQuote.updatePriceProducts(product.quantity, total.price, total.price, product.product, quote)
      }
    });
  } catch (err) {
    console.log(err);
  }

  try {
    const subtotal = parseInt(await controllerQuote.subtotal(quote))
    const totalTaxes = subtotal * taxes
    const total = subtotal + totalTaxes
    const status = 2;
    await controllerQuote.updateTotalQuote(status, subtotal, totalTaxes, total, quote)
  } catch (err) {
    console.log(err)
  }

  try {
    let link = ''
    const typeEmail = 'sendQuoteReview'
    const subject = 'Processed quotation'
    const emailCustomer = await controllerQuote.email(idCustomer[0].idcustumer)

    const result = await mail.sendEmail(emailCustomer[0].email, link, typeEmail, subject)
    res.status(200).json({ "Message": `Mail sent to ${result}` })
  } catch (err) {
    console.log('El error es:', err);
    res.status(500).json({ "Message": `Error to set email` });
  }
})

// Approval quote

api.post('/sendApprovalQuote', verifyToken, async (req, res) => {
  const { quote } = req.body
  const { Token } = req.cookies

  const info = jwt.decodeToken(Token)

  try {
    const result = await controllerQuote.approveQuote(quote)
    res.status(200).json({ "Message": `Quote approval` })

  } catch (err) {
    console.log(err)
  }

  // try {
  //   let link = ''
  //   const typeEmail = 'sendQuoteReview'
  //   const subject = 'Processed quotation'

  //   const result = await mail.sendEmail(info.email, link, typeEmail, subject)
  //   res.status(200).json({ "Message": `Mail sent to ${result}` })
  // } catch (err) {
  //   console.log('El error es:', err);
  //   res.status(500).json({ "Message": `Error to set email` });
  // }
})

// products

api.get('/previewProducts/:idQuote', verifyToken, async (req, res) => {
  const idQuote = req.params.idQuote;
  try {
    const result = await controllerQuote.preview(idQuote)
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})

api.get('/processProducts/:idQuote', verifyToken, async (req, res) => {
  const idQuote = req.params.idQuote;
  try {
    const result = await controllerQuote.process(idQuote)
    res.status(200).json(result)
  } catch {
    res.status(404).json('error')
  }
})

// download quote
api.get("/quotePdf/download/:quote", async (req, res) => {
  const { quote } = req.params

  const data = await controllerQuote.products(quote)
  const dataQuote = await controllerQuote.quoteInfo(quote)

  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=quote.pdf",
  });

  pdf.buildQuote(res, data, dataQuote);
})


export const QuodetRoute = api
