import { Server } from 'socket.io';

let io;
export default function (httpServer) {
  if (httpServer) {
    io = new Server(httpServer, {
      cors: {
        origin: '*', //Allow origin from anywhere, only for testing
      },
    });
    io.on('connection', (socket) => {
      socket.on('message', ({ name, message }) => {
        io.emit('message', { name, message });
      });
      socket.on('canvas-data', (drawData) => {
        io.emit('canvas-data', drawData);
      });
    });
  }
  return io;
}
