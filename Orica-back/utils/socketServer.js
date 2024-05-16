import { Server as socketServer } from "socket.io";

export let io = null

export const initSocketServer = (server) => {
  io = new socketServer(server, {
    cors: {
      origin: "*"
    }
  })
}