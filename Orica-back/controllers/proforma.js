import { data } from "../config/index.js"

// id

export const proformaId = async (quote) => {
  const result = await data.database.query(
    `
    SELECT id
    FROM proforma
    WHERE idquote = $1;
    `, [quote]
  )
  return result.rows
}

export const quoteId = async (proforma) => {
  const result = await data.database.query(
    `
    SELECT idquote
    FROM proforma
    WHERE id = $1;
    `, [proforma]
  )
  return result.rows
}
// counters

export const counterTotalProforma = async () => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM proforma
    WHERE visible = true
  `,
  )
  return result.rows[0].count
}

// proforma

export const proforma = async (proforma) => {
  const result = await data.database.query(
    `
    SELECT proforma.id, quote.name, TO_CHAR(quote.date, 'YYYY-MM-DD') AS date, 
    quote.port, quote.phone, 
    quote.email, proforma.idquote, quote.subtotal,
    quote.taxes, quote.total, proforma.paganname, 
    proforma.paganlastname, proforma.bank, proforma.accountnumber
    FROM proforma
    INNER JOIN quote ON quote.id = proforma.idquote
    WHERE proforma.visible = true
    AND proforma.id = $1 
  `, [proforma]
  )
  return result.rows
}

export const proformaCustomer = async (idCustomer) => {
  const result = await data.database.query(
    `
    SELECT proforma.id, quote.name, TO_CHAR(quote.date, 'YYYY-MM-DD') AS date, 
    quote.port, quote.phone, 
    quote.email, proforma.idquote, quote.subtotal,
    quote.taxes, quote.total, proforma.paganname, 
    proforma.paganlastname, proforma.bank, proforma.accountnumber
    FROM proforma
    INNER JOIN quote ON quote.id = proforma.idquote
    WHERE proforma.visible = true
    AND quote.idcustumer = $1
  `, [idCustomer]
  )
  return result.rows
}

export const allProformas = async () => {
  const result = await data.database.query(
    `
    SELECT proforma.id, quote.name, TO_CHAR(quote.date, 'YYYY-MM-DD') AS date, 
    quote.port, quote.phone, 
    quote.email, proforma.idquote, quote.subtotal,
    quote.taxes, quote.total, proforma.paganname, 
    proforma.paganlastname, proforma.bank, proforma.accountnumber
    FROM proforma
    INNER JOIN quote ON quote.id = proforma.idquote
    WHERE proforma.visible = true
  `,
  )
  return result.rows
}

export const existsProform = async (quoteid, paganname, paganlastname, bank, accountnumber) => {
  const result = await data.database.query(
    `
    SELECT id
    FROM proforma
    WHERE  visible = true
    AND idquote = $1
    AND paganname = $2
    AND paganlastname = $3
    AND bank = $4
    AND accountnumber = $5;
    `, [quoteid, paganname, paganlastname, bank, accountnumber]
  )
  return result.rows
}

export const taxes = async (quoteid) => {
  const result = await data.database.query(
    `
    SELECT quote.taxes / (quote.total - quote.taxes) AS taxes
    FROM quote
    WHERE quote.visible = true
    AND quote.id = $1;
    `, [quoteid]
  )
  return result.rows[0].taxes
}

// insert

export const sendProforma = async (quote, paganName, paganLastname, bank, accountNumber) => {
  const result = await data.database.query(
    `
    INSERT INTO proforma(idquote, paganname, paganlastname, bank, accountnumber)
    VALUES ($1, $2, $3, $4, $5);
    `, [quote, paganName, paganLastname, bank, accountNumber]
  )
  return result
}

export const updateProforma = async (quote, paganName, paganLastname, bank, accountNumber, idProforma) => {
  const result = await data.database.query(
    `
    UPDATE proforma SET idquote = $1, paganname = $2, paganlastname = $3, bank = $4, accountnumber = $5
    WHERE id = $6
    `, [quote, paganName, paganLastname, bank, accountNumber, idProforma]
  )
  return result
}

export const controllerProforma = {
  proformaId,
  quoteId,
  proforma,
  proformaCustomer,
  allProformas,
  existsProform,
  counterTotalProforma,
  taxes,
  sendProforma,
  updateProforma
}
