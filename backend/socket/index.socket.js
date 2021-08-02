import { Server } from 'socket.io';

import handleConnection from './handlers/connection.handler.js';

let io;
export default function (httpServer) {
  if (!httpServer) {
    return null;
  }

  io = new Server(httpServer, {
    cors: {
      origin: '*', //Allow origin from anywhere, only for testing
    },
  });

  io.on('connection', (socket) => {
    handleConnection(io, socket);
  });

  return io;
}
