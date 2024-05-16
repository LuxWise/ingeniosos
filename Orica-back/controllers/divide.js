import { data } from "../config/index.js"

export const ports = async () => {
  const result = await data.database.query(
    `
    SELECT id, port FROM ports;
    `
  )
  return result.rows
}

export const divisions = async () => {
  const result = await data.database.query(
    `
    SELECT quote.name, divisions.id, products.product, divisions.quantity,ports.port, divisions.price, divisions.total,
    TO_CHAR(divisions.date, 'YYYY-MM-DD') AS date
    FROM  divisions
    INNER JOIN quote ON quote.id = divisions.idquote 
    INNER JOIN ports ON ports.id = divisions.idport
    INNER JOIN products ON products.id = divisions.idproduct
    ORDER BY divisions.date
    `
  )
  return result.rows
}

export const modifydivisions = async () => {
  const result = await data.database.query(
    `
    SELECT divisions.id, divisions.idproduct, divisions.idquote, ports.port, 
    products.product, divisions.quantity, 
    TO_CHAR(divisions.date, 'YYYY-MM-DD') AS date,
    divisions.idport, divisions.price
    FROM divisions
    INNER JOIN ports ON ports.id = divisions.idport
    INNER JOIN products ON products.id = divisions.idproduct
    ORDER BY idquote;
    `
  )
  return result.rows
}


export const division = async (idQuote) => {
  const result = await data.database.query(
    `
    SELECT divisions.id, products.product, divisions.quantity,ports.port, divisions.price, divisions.total,
    TO_CHAR(divisions.date, 'YYYY-MM-DD') AS date
    FROM  divisions
    INNER JOIN ports ON ports.id = divisions.idport
    INNER JOIN products ON products.id = divisions.idproduct
    WHERE divisions.idquote = $1
    ORDER BY products.id
    `, [idQuote]
  )
  return result.rows
}

export const divisionsPort = async (port) => {
  const result = await data.database.query(
    `
    SELECT  quote.name, divisions.id, divisions.quantity, divisions.price, ports.port,
    TO_CHAR(divisions.date, 'YYYY-MM-DD') AS date
    FROM divisions
    INNER JOIN quote ON quote.id = divisions.idquote 
    AND quote.statusid = 3
    INNER JOIN ports ON ports.id = divisions.idport
    WHERE idport = $1 AND selectedorder = false
    ORDER BY date
    `, [port]
  )
  return result.rows
}

export const divid = async (port, quantity, price, date, idproduct, idquote, total) => {
  const result = await data.database.query(
    `
    INSERT INTO divisions(idport, quantity, price, date, idproduct, idquote, total)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `, [port, quantity, price, date, idproduct, idquote, total]
  )
  return result
}

export const selectOrderName = async (ordername, id) => {
  const result = await data.database.query(
    `
    UPDATE  divisions 
    SET  selectedorder = true, ordername = $1 
    WHERE id = $2
    `, [ordername, id]
  )
  return result
}

export const modifyselectOrderName = async (ordername) => {
  const result = await data.database.query(
    `
    UPDATE divisions SET selectedorder = false, ordername = '' 
    WHERE ordername = $1
    `, [ordername]
  )
  return result
}

export const updateDivide = async (quantity, price, date, idport, idDivide) => {
  const result = await data.database.query(
    `
    UPDATE  divisions 
    SET  quantity = $1, price = $2, date = $3, idport = $4 
    WHERE id = $5
    `, [quantity, price, date, idport, idDivide]
  )
  return result
}

export const divideController = { ports, divid, divisions, modifydivisions, division, divisionsPort, selectOrderName, modifyselectOrderName, updateDivide }