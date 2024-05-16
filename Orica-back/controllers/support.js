import { data } from "../config/index.js"

//list

export const listSupportType = async () => {
  const rows = await data.database.query(
    `
    SELECT id, type AS name 
    FROM listSupportType;
    `,
  )
  return rows.rows
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

export const requestId = async (subject, type, idCustumer) => {
  const result = await data.database.query(
    `
    SELECT id
    FROM users
    WHERE subject = $1
    AND type = $2
    AND idCustumer = $3
    `, [subject, type, idCustumer]
  )
  return result.rows
}

// count

export const counterTotalRequest = async (idcustumer) => {
  const result = await data.database.query(
    `
    SELECT COUNT(*)
    FROM support
    WHERE idcustumer = $1;
  `, [idcustumer]
  )
  return result.rows[0].count
}

// request

export const requests = async (idCustumer) => {
  const result = await data.database.query(
    `
    SELECT id, type, subject, description,
    TO_CHAR(support.date, 'YYYY-MM-DD') AS date
    FROM support
    WHERE idcustumer = $1
    ORDER BY id;
    `, [idCustumer]
  )
  return result.rows
}

export const allRequests = async () => {
  const result = await data.database.query(
    `
    SELECT id
    FROM support
    ORDER BY id;
    `, []
  )
  return result.rows
}

export const requestsType = async (idCustumer, type) => {
  const result = await data.database.query(
    `
    SELECT support.id, support.type, support.subject, support.description, statussupport.supportstatus as status,
    TO_CHAR(support.date, 'YYYY-MM-DD') AS date
    FROM support
    INNER JOIN statusSupport ON statusSupport.id = support.idsupportstatus
    WHERE support.idcustumer = $1
    AND support.idsupporttype = $2
    ORDER BY support.id;
    `, [idCustumer, type]
  )
  return result.rows
}


// insert

export const sendSupport = async (subject, type, description, idCustumer, idsupporttype, idSupportStatus) => {
  const result = await data.database.query(
    `
    INSERT INTO support(subject, type, description, idCustumer, idsupporttype, idsupportstatus)
    VALUES ($1, $2, $3, $4, $5, $6);
    `, [subject, type, description, idCustumer, idsupporttype, idSupportStatus]
  )
  return result
}


export const controllerSupport = {
  listSupportType,
  custormerId,
  requests,
  allRequests,
  requestsType,
  counterTotalRequest,
  sendSupport
}
