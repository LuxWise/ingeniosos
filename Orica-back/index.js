import { server } from "./app.js"
import { DB_DATABASE, DB_HOST, DB_INTERNAL, DB_PASSWORD, DB_PORT, DB_USER, PORT } from "./constans.js"
import { io } from './utils/index.js';
import pg from "pg";


async function startServer() {
  try {
    new pg.Pool({
      connectionString: DB_INTERNAL,
      // host: DB_HOST,
      // user: DB_USER,
      // password: DB_PASSWORD,
      // database: DB_DATABASE,
      // port: DB_PORT,
    })


    server.listen(PORT, () => {
      console.log(`CORRIENDO EN EL PUERTO ${PORT}`);
      io.sockets.on("connection", (socket) => {
        socket.on("disconnect", () => {
        });
      });
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

startServer();

