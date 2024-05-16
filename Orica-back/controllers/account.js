import { data } from "../config/index.js"

// accountStatement

export const accountStatement = async () => {
  const result = await data.database.query(
    `
    SELECT id,  account, glaccount, billingdocument, assignment,documentnumber,
    TO_CHAR(postingdate, 'YYYY/MM/DD') AS  postingdate,
    TO_CHAR(netduedate, 'YYYY/MM/DD') AS netduedate, 
    arrearsbynetduedate, amountindoc, documentcurrency, localcurrency, 
    reference, documenttype
    FROM accountstatement
    ORDER BY account;
    `, []
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
    ALTER SEQUENCE accountstatement_secualize RESTART WITH 100;
    `, []
  )

  const result = await data.database.query(
    `
    DELETE FROM accountstatement;
    `, []
  )
  return result.rows
}

export const contrellerAccountStatement = {
  accountStatement,
  accountStatementCustomer,
  remplace
}