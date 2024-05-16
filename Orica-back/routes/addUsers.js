import express from 'express';
import pgPromise from 'pg-promise';
import fileUpload from 'express-fileupload';
import readXlsxFile from 'read-excel-file/node';
import path from 'path';
import { verifyToken } from '../middleware/index.js';
import { fileURLToPath } from 'url';
import { data } from '../config/index.js';
import { contrellerAccountStatement, contrellerUsers } from '../controllers/index.js';

const pgp = pgPromise({
  capSQL: true
});

const api = express.Router();

const uploadOpts = {
  useTempFiles: true,
  tempFileDir: '/tmp/'
}

api.get('/format/users', async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const format = path.join(__dirname, `../doc/CreateUsers.xlsx`);

  res.download(format)
})

api.post('/addUser', verifyToken, async (req, res) => {
  const { name, lastname, email, typeUser } = req.body

  name.toLowerCase()
  lastname.toLowerCase()
  const userExists = await contrellerUsers.usersExists(name, lastname, email)

  if (userExists.length > 0) {
    console.log(name + 'exists')
    return
  } else {
    const nameUser = name.toLowerCase().split('')
    const password = '$2a$10$9/FzbQNJgujQZr3bdzRa1udy3rBYhhKEhaXtqRAqFfAyXsp6ZirGi'
    const username = nameUser[0] + lastname.toLowerCase();
    await contrellerUsers.addUser(name, lastname, username, password, email, typeUser)
  }

  res.json('good');
})

api.post('/addUsers', verifyToken, fileUpload(uploadOpts), async (req, res) => {
  const schema = {
    'Name': { prop: 'name', type: String, },
    'LastName': { prop: 'lastName', type: String, },
    'Email': { prop: 'email', type: String, },
    'TypeUser': { prop: 'typeUser', type: String, },
  }

  const roleOptions = {
    'SuperAdmin': 1,
    'Admin': 2,
    'ChiefCommercial': 3,
    'Commercial': 4,
    'Customer': 5,
    'Proforma': 6,
    'ChiefProforma': 7,
  }

  const { excel } = req.files
  const rows = await readXlsxFile(excel.tempFilePath, { sheet: 'Hoja', schema })
  const json = rows.rows

  json.map(obj => {
    obj.typeUser = roleOptions[obj.typeUser]
  })

  json.map(async user => {
    const name = user.name.toLowerCase()
    const lastname = user.lastName.toLowerCase()
    const userExists = await contrellerUsers.usersExists(name, lastname, user.email)

    if (userExists.length > 0) {
      console.log(user.name + 'exists')
      return
    } else {
      const nameUser = user.name.toLowerCase().split('')
      const password = 'cs1234'
      const username = nameUser[0] + lastname;
      await contrellerUsers.addUser(name, lastname, username, password, user.email, user.typeUser)
    }
  })
  res.json('good');

})

export const addUSerRoutes = api;