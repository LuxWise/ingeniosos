import { data } from "../config/index.js"

// list
export const listProducts = async () => {
  const result = await data.database.query(
    `
    SELECT
    product AS name
    FROM listProducts
    WHERE listProducts.visible = true;
    `,
  )
  return result.rows
}

export const listCommercial = async () => {
  const result = await data.database.query(
    `
    SELECT id, name, lastname
    FROM users
    WHERE users.visible = true
    AND idrole = 4;
    `,
  )
  return result.rows
}

// id

export const custormerId = async (name, lastname, email) => {
  const result = await data.database.query(
    `
    SELECT id
    FROM users
    WHERE name = $1
    AND lastname = $2
    AND email = $3
    `, [name, lastname, email]
  )
  return result.rows
}

export const custormerIdQuote = async (quote) => {
  const result = await data.database.query(
    `
    SELECT idcustumer
    FROM quote
    WHERE id = $1;
    `, [quote]
  )
  return result.rows
}

export const productId = async (product, quantity) => {
  const result = await data.database.query(
    `
    SELECT id
    FROM products
    WHERE products.product = $1
    AND products.quantity = $2;
    `, [product, quantity]
  )
  return result.rows
}

export const quoteId = async (name, port, phone, date) => {
  const result = await data.database.query(
    `
    SELECT id
    FROM quote
    WHERE quote.visible = true
    AND name = $1
    AND port = $2
    AND phone = $3
    AND date = $4;
    `, [name, port, phone, date]
  )
  return result.rows
}

// email

export const email = async (id) => {
  const result = await data.database.query(
    `
    SELECT email
    FROM users
    WHERE id = $1;
    `, [id]
  )
  return result.rows
}

// pending

export const pending = async (type, idcustumer) => {
  const result = await data.database.query(
    `
    SELECT id
    FROM quote
    WHERE statusid = $1
    AND idcustumer = $2;
    `, [type, idcustumer]
  )
  return result.rows
}

export const pendingCommercial = async (type, idCommercial) => {
  const result = await data.database.query(
    `
    SELECT id
    FROM quote
    WHERE statusid = $1
    AND idcommercial = $2;
    `, [type, idCommercial]
  )
  return result.rows
}

export const pendingAllCommercial = async () => {
  const result = await data.database.query(
    `
    SELECT id
    FROM quote
    WHERE statusid = 1
    `, []
  )
  return result.rows
}

export const pendingApproval = async () => {
  const result = await data.database.query(
    `
    SELECT id
    FROM quote
    WHERE statusid = 3
    `,
  )
  return result.rows
}

export const quotesCommercialComplete = async () => {
  const result = await data.database.query(
    `
    SELECT id
    FROM quote
    WHERE statusid = 5
    `,
  )
  return result.rows
}

// counters

export const counterTotalQuotes = async (idcustumer) => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM quote
    WHERE visible = true
    AND idcustumer = $1;
  `, [idcustumer]
  )
  return result.rows[0].count
}
export const counterTotalQuotesCommercial = async (idcommercial) => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM quote
    WHERE visible = true
    AND idcommercial = $1;
  `, [idcommercial]
  )
  return result.rows[0].count
}

export const counterTotalQuotesCommercialAll = async () => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM quote
    WHERE visible = true;
  `,
  )
  return result.rows[0].count
}

export const counterOpenQuotesCommercial = async (idcommercial) => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM quote
    WHERE visible = true
    AND idcommercial = $1
    AND quote.statusid = 1;
  `, [idcommercial]
  )
  return result.rows[0].count
}

export const counterOpenQuotesCommercialAll = async () => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM quote
    WHERE visible = true
    AND quote.statusid = 1;
  `,
  )
  return result.rows[0].count
}

export const counterDateQuotesCommercial = async (idcommercial) => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM quote
    WHERE visible = true
    AND idcommercial = $1
    AND CAST(date AS DATE) = CURRENT_DATE;
  `, [idcommercial]
  )
  return result.rows[0].count
}

export const counterDateAllQuotesCommercial = async () => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM quote
    WHERE visible = true
    AND CAST(date AS DATE) = CURRENT_DATE;
  `,
  )
  return result.rows[0].count
}

export const counterNewQuotes = async (status) => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM quote
    WHERE visible = true
    AND statusid = $1;
  `, [status]
  )
  return result.rows[0].count
}

export const counterQuotesApprove = async () => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM quote
    WHERE quote.visible = true
    AND quote.statusid = 3;
    `,
  )
  return result.rows[0].count
}

export const counterQuotesPending = async () => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM quote
    WHERE quote.visible = true
    AND quote.statusid = 2;
    `,
  )
  return result.rows[0].count
}

export const counterQuotesCommercial = async () => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM quote
    WHERE quote.visible = true
    AND (quote.statusid = 3 OR quote.statusid = 2);
    `,
  )
  return result.rows[0].count
}

// quote

export const quoteExits = async (name, status, port, phone) => {
  const result = await data.database.query(
    `
    SELECT id
    FROM quote
    WHERE quote.visible = true
    AND name = $1
    AND statusid = $2
    AND port = $3
    AND phone = $4;
    `, [name, status, port, phone]
  )
  return result.rows
}

export const quote = async () => {
  const result = await data.database.query(
    `
    SELECT quote.id, quote.name, quote.port, ports.id AS portId, quote.phone,
    quote.idCommercial, statusquotation.quotestatus AS status,
    TO_CHAR(quote.date, 'YYYY-MM-DD') AS date
    FROM quote
    INNER JOIN statusquotation ON statusquotation.id = quote.statusid
    INNER JOIN ports ON ports.port = quote.port
    WHERE quote.visible = true
    ORDER BY quote.id;
    `, []
  )
  return result.rows
}

export const quotes = async (idCustumer) => {
  const result = await data.database.query(
    `
    SELECT quote.id, quote.name, quote.port, quote.phone,     
    statusquotation.quotestatus AS status,
    TO_CHAR(quote.date, 'YYYY-MM-DD') AS date
    FROM quote
    INNER JOIN statusquotation ON statusquotation.id = quote.statusid
    WHERE quote.visible = true
    AND idcustumer = $1
    ORDER BY quote.id;
    `, [idCustumer]
  )
  return result.rows
}

export const quotesProcess = async (idCustumer) => {
  const result = await data.database.query(
    `
    SELECT quote.id, quote.name, quote.port, quote.phone,     
    statusquotation.quotestatus AS status,
    TO_CHAR(quote.date, 'YYYY-MM-DD') AS date
    FROM quote
    INNER JOIN statusquotation ON statusquotation.id = quote.statusid
    WHERE quote.visible = true
    AND quote.statusid = 2
    AND idcustumer = $1;
    `, [idCustumer]
  )
  return result.rows
}

export const quotesCommercial = async (idCommercial) => {
  const result = await data.database.query(
    `
    SELECT quote.id, quote.name, quote.port, quote.phone,     
    statusquotation.quotestatus AS status,
    TO_CHAR(quote.date, 'YYYY-MM-DD') AS date
    FROM quote
    INNER JOIN statusquotation ON statusquotation.id = quote.statusid
    WHERE quote.visible = true
    AND idcommercial = $1
    ORDER BY quote.id;
    `, [idCommercial]
  )
  return result.rows
}

export const quotesCommercialAll = async () => {
  const result = await data.database.query(
    `
    SELECT quote.id, quote.name, quote.port, quote.phone,     
    statusquotation.quotestatus AS status,
    TO_CHAR(quote.date, 'YYYY-MM-DD') AS date
    FROM quote
    INNER JOIN statusquotation ON statusquotation.id = quote.statusid
    WHERE quote.visible = true
    ORDER BY quote.id;
    `, []
  )
  return result.rows
}

export const quotesCommercialNew = async (idCommercial) => {
  const result = await data.database.query(
    `
    SELECT quote.id, quote.name, quote.port, quote.phone,     
    statusquotation.quotestatus AS status,
    TO_CHAR(quote.date, 'YYYY-MM-DD') AS date
    FROM quote
    INNER JOIN statusquotation ON statusquotation.id = quote.statusid
    WHERE quote.visible = true
    AND idcommercial = $1
    AND quote.statusid = 1;
    `, [idCommercial]
  )
  return result.rows
}

export const quotesProformaNew = async () => {
  const result = await data.database.query(
    `
    SELECT quote.id, quote.name, quote.port, quote.phone,     
    statusquotation.quotestatus AS status, quote.taxes, quote.total,
    TO_CHAR(quote.date, 'YYYY-MM-DD') AS date
    FROM quote
    INNER JOIN statusquotation ON statusquotation.id = quote.statusid
    WHERE quote.visible = true
    AND quote.statusid = 3
    ORDER BY quote.id;
    `,
  )
  return result.rows
}

export const quoteInfo = async (idQuote) => {
  const result = await data.database.query(
    `
    SELECT quote.name, quote.port, quote.phone,     
    statusquotation.quotestatus AS status,
    quote.observations,
    TO_CHAR(quote.date, 'YYYY-MM-DD') AS date,
    quote.email, quote.id, quote.observations,
    quote.subtotal, quote.taxes , quote.total
    FROM quote
    INNER JOIN statusquotation ON statusquotation.id = quote.statusid
    WHERE quote.visible = true
    AND quote.id = $1;
  `, [idQuote]
  )
  return result.rows
}

export const subtotal = async (idQuote) => {
  const result = await data.database.query(
    `
    SELECT SUM(total) FROM products
    WHERE quoteid = $1;
    `, [idQuote]
  )
  return result.rows[0].sum
}

//products

export const products = async (idQuote) => {
  const result = await data.database.query(
    `
    SELECT product, quantity, price, total FROM products
    WHERE quoteid = $1;
    `, [idQuote]
  )
  return result.rows
}

// preview

export const preview = async (idQuote) => {
  const result = await data.database.query(
    `
    SELECT id, product, quantity FROM products
    WHERE quoteid = $1;
    `, [idQuote]
  )
  return result.rows
}

// process 

export const process = async (idQuote) => {
  const result = await data.database.query(
    `
    SELECT product, quantity, price FROM products
    WHERE quoteid = $1;
    `, [idQuote]
  )
  return result.rows
}

// insert

export const sendQuoteProduct = async (product, quantity, quoteId) => {
  const result = await data.database.query(
    `
    INSERT INTO products(product, quantity, quoteId)
    VALUES ($1, $2, $3);
    `, [product, quantity, quoteId]
  )
  return result
}

export const sendQuote = async (name, status, port, phone, observations, email, idCustumer, idCommercial, date) => {
  const result = await data.database.query(
    `
    INSERT INTO quote(name, statusid, port, phone, observations, email, 
    idCustumer, idCommercial, date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `, [name, status, port, phone, observations, email,
    idCustumer, idCommercial, date]
  )
  return result
}

// update

export const updatePriceProducts = async (quantity, price, total, product, quote) => {
  const result = await data.database.query(
    `
    UPDATE products
    SET quantity = $1, price = $2, total = $3  
    WHERE product = $4
    AND quoteid = $5;
    `, [quantity, price, total, product, quote]
  )
  return result
}

export const updateTotalQuote = async (status, subtotal, taxes, total, idQuote) => {
  const result = await data.database.query(
    `
    UPDATE quote
    SET statusid = $1, subtotal = $2, taxes = $3, total = $4
    WHERE id = $5;
    `, [status, subtotal, taxes, total, idQuote]
  )
  return result
}

export const approveQuote = async (idQuote) => {
  const result = await data.database.query(
    `
    UPDATE quote
    SET statusid = 3
    WHERE id = $1;
    `, [idQuote]
  )
  return result
}

export const InProformaQuote = async (idQuote) => {
  const result = await data.database.query(
    `
    UPDATE quote
    SET statusid = 4
    WHERE id = $1;
    `, [idQuote]
  )
  return result
}
export const InSelectionQuote = async (idQuote) => {
  const result = await data.database.query(
    `
    UPDATE quote
    SET statusid = 5
    WHERE id = $1;
    `, [idQuote]
  )
  return result
}


export const controllerQuote = {
  listProducts,
  listCommercial,
  custormerId,
  custormerIdQuote,
  productId,
  quoteId,
  pending,
  pendingCommercial,
  pendingAllCommercial,
  pendingApproval,
  quotesCommercialComplete,
  email,
  counterNewQuotes,
  counterTotalQuotes,
  counterTotalQuotesCommercial,
  counterTotalQuotesCommercialAll,
  counterQuotesCommercial,
  counterQuotesPending,
  counterOpenQuotesCommercial,
  counterOpenQuotesCommercialAll,
  counterDateQuotesCommercial,
  counterDateAllQuotesCommercial,
  counterQuotesApprove,
  quoteExits,
  quote,
  quoteInfo,
  quotes,
  quotesProcess,
  quotesCommercial,
  quotesCommercialAll,
  quotesCommercialNew,
  quotesProformaNew,
  products,
  subtotal,
  preview,
  process,
  sendQuoteProduct,
  sendQuote,
  updatePriceProducts,
  updateTotalQuote,
  approveQuote,
  InSelectionQuote,
  InProformaQuote
}
