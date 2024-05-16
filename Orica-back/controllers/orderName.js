import { data } from "../config/index.js"

export const ordername = async () => {
  const result = await data.database.query(
    `
    SELECT ordername.id, ordername.name, ordername.iddivision,
    divisions.quantity, divisions.price, divisions.date, divisions.idquote,
    (
        SELECT  ports.port FROM divisions
        INNER JOIN ports ON divisions.idport = ports.id
        WHERE divisions.id = ordername.iddivision
        )
    FROM ordername
    INNER JOIN divisions on divisions.id = ordername.iddivision
    ORDER BY ordername.name;
    `
  )
  return result.rows
}

export const orderNameDivisions = async () => {
  const result = await data.database.query(
    `
    SELECT  ordername.name AS id, COUNT(ordername.iddivision) AS divisions FROM ordername
    INNER JOIN  divisions ON divisions.id = ordername.iddivision
    GROUP BY ordername.name;
    `
  )
  return result.rows
}

export const orderNameDivisionsDetails = async (orderName) => {
  const result = await data.database.query(
    `
    SELECT ordername.iddivision AS id, divisions.price, divisions.quantity, 
    TO_CHAR(divisions.date, 'YYYY-MM-DD') AS date,(
      SELECT  ports.port FROM divisions
      INNER JOIN ports ON divisions.idport = ports.id
      WHERE divisions.id = ordername.iddivision
      )
    FROM ordername
    INNER JOIN  divisions ON divisions.id = ordername.iddivision
    WHERE ordername.name = $1
    `, [orderName]
  )
  return result.rows
}

export const order = async (name, divide) => {
  const result = await data.database.query(
    `
    INSERT INTO ordername (name, iddivision)
    VALUES  ($1, $2);
    `, [name, divide]
  )
  return result.rows
}

export const modifyOrder = async (name) => {
  const result = await data.database.query(
    `
    DELETE FROM ordername WHERE name = $1;
    `, [name]
  )
  return result.rows
}

export const orderNameController = { ordername, orderNameDivisions, orderNameDivisionsDetails, order, modifyOrder }