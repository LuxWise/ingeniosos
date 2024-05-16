import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import { initSocketServer } from './utils/index.js';
import { AuthRoute, QuodetRoute, UserRoute, supportRoute, ProformaRoutes, xlsxRoutes, addUSerRoutes, TableRoute, chatRoutes, shipmentsRoutes, divideRoutes, orderNameRoutes } from './routes/index.js';
import path from 'path';

const corsOptions = {
  origin: ['https://orica.ingeniososweb.com', 'http://localhost:3000', 'https://orica.up.railway.app'],
  methods: ["POST", "GET", "PUT"],
  credentials: true,
  optionsSuccessStatus: 200
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.static("uploads"))
app.use('/oricaApi/', AuthRoute)
app.use('/oricaApi/', TableRoute)
app.use('/oricaApi/', UserRoute)
app.use('/oricaApi/', QuodetRoute)
app.use('/oricaApi/', supportRoute)
app.use('/oricaApi/', ProformaRoutes)
app.use('/oricaApi/', xlsxRoutes)
app.use('/oricaApi/', addUSerRoutes)
app.use('/oricaApi/', chatRoutes)
app.use('/oricaApi/', shipmentsRoutes)
app.use('/oricaApi/', divideRoutes)
app.use('/oricaApi/', orderNameRoutes)

// Configura el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join('./doc'));

const server = http.createServer(app);
initSocketServer(server)

export { server }
