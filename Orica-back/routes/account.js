import express from 'express';
import pgPromise from 'pg-promise';
import fileUpload from 'express-fileupload';
import readXlsxFile from 'read-excel-file/node';
import { data } from '../config/index.js';
import { verifyToken } from '../middleware/index.js';
import { contrellerAccountStatement } from '../controllers/index.js';

const pgp = pgPromise({
  capSQL: true
});

const api = express.Router();

const uploadOpts = {
  useTempFiles: true,
  tempFileDir: '/tmp/'
}

function ICN(value) {
  const regex = /^ICN\d+/;
  return regex.test(value);
}

function ICT(value) {
  const regex = /^ICT\d+/;
  return regex.test(value);
}

api.get('/accountStatements', verifyToken, async (req, res) => {
  try {
    const result = await contrellerAccountStatement.accountStatement()
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.get('/accountStatements/:acount', verifyToken, async (req, res) => {
  const { acount } = req.params

  try {
    const result = await contrellerAccountStatement.accountStatementCustomer(acount)
    res.status(200).json(result)
  } catch {
    res.status(404)
  }
})

api.post('/xlsx', fileUpload(uploadOpts), async (req, res) => {
  const schema = {
    'Account': { prop: 'account', type: String, },
    'G/L Account': { prop: 'glaccount', type: String, },
    'Billing Document': { prop: 'billingdocument', type: String, },
    'Assignment': { prop: 'assignment', type: String, },
    'Document Number': { prop: 'documentnumber', type: String, },
    'Posting Date': { prop: 'postingdate', type: Date, },
    'Net Due Date': { prop: 'netduedate', type: Date, },
    'Arrears by Net Due Date': { prop: 'arrearsbynetduedate', type: String, },
    'Amount in Doc. Curr.': { prop: 'amountindoc', type: String, },
    'Document Currency': { prop: 'documentcurrency', type: String, },
    'Local Currency': { prop: 'localcurrency', type: String, },
    'Reference': { prop: 'reference', type: String, },
    'Document Type': { prop: 'documenttype', type: String, },
    'Text': { prop: 'text', type: String, },
  }
  const { excel } = req.files
  try {
    await contrellerAccountStatement.remplace()
    const rows = await readXlsxFile(excel.tempFilePath, { sheet: 'Sheet1', schema })
    const json = rows.rows

    for (const item of json) {
      if (ICN(item.account) || ICT(item.account) || item.account == null || item.account == "") {
      } else {
        const query = pgp.helpers.insert(item, null, 'accountstatement');

        try {
          await data.databasePromise.none(query);
        } catch (error) {
          console.log(error);
        }
      }
    }
    res.status(200).json('good');
  } catch (err) {
    console.log('nop')
    res.status(400).json('bad');
  }
})

export const xlsxRoutes = api;

