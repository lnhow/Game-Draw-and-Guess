import handleDisconnect from './disconnect.handler.js';
import handleJoinRoom from './joinRoom.handler.js';
import handleCanvasData from './drawData.handler.js';
import handleMessage from './message.handler.js';

const ConnectionHandler = (io, socket) => {
  //Callback for error handling

  socket.on('join', ({ user, roomId }, callback) => {
    handleJoinRoom(io, socket, { user, roomId }, callback);
  });

  // socket.on('start-game', (room, callback) => {
  //   //Handle start game
  // });

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
