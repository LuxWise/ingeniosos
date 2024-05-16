import { data } from "../config/index.js"

// shipment

export const shipment = async () => {
  const result = await data.database.query(
    `
    SELECT id, source, status, vessel,departure, arrive, 
    product, netweight, grossweigth, purpose, 
    billoflading, pol, pod
    FROM shipments
    ORDER BY source;
    `, []
  )
  return result.rows
}

export const shipmentDetail = async (ship) => {
  const result = await data.database.query(
    `
    SELECT source, status, vessel, departure, arrive, 
    product, netweight, grossweigth, purpose, 
    billoflading, pol, pod
    FROM shipments
    WHERE id = $1
    ORDER BY source;
    `, [ship]
  )
  return result.rows
}

export const shipmentBilling = async (ship) => {
  const result = await data.database.query(
    `
    SELECT id,source, status, vessel, departure, arrive, 
    product, netweight, grossweigth, purpose, 
    billoflading, pol, pod
    FROM shipments
    WHERE billoflading = $1
    ORDER BY source;
    `, [ship]
  )
  return result.rows
}

export const accountStatementCustomer = async (account) => {
  console.log(account)
  const result = await data.database.query(
    `
    SELECT *  
    FROM accountstatement
    WHERE account = $1;
    `, [account]
  )
  return result.rows
}

export const remplace = async () => {
  await data.database.query(
    `
    ALTER SEQUENCE shipment_secualize RESTART WITH 100;
    `, []
  )

  const result = await data.database.query(
    `
    DELETE FROM shipments;
    `, []
  )
  return result.rows
}


export const contrellerShipment = {
  shipment,
  shipmentDetail,
  accountStatementCustomer,
  remplace,
  shipmentBilling
}