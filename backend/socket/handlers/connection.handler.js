import handleDisconnect from './disconnect.handler.js';
import handleJoinRoom from './joinRoom.handler.js';
import handleCanvasData from './drawData.handler.js';
import handleMessage from './message.handler.js';

const ConnectionHandler = (io, socket) => {
  //Callback for error handling

  socket.on('join', ({ name, room }, callback) => {
    handleJoinRoom(io, socket, { name, room }, callback);
  });

  socket.on('message', ({ message }, callback) => {
    handleMessage(io, socket, { message }, callback);
  });

  socket.on('canvas-data', (drawData, callback) => {
    handleCanvasData(io, socket, drawData, callback);
  });

  socket.on('disconnect', () => {
    handleDisconnect(io, socket);
  });
};

export default ConnectionHandler;
