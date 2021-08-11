import RoomSocket from '../controllers/room.js';

const handleCanvasData = (io, socket, drawData, callback) => {
  const user = RoomSocket.getUserBySocketId(socket.id);
  if (user) {
    socket.to(user.roomId).emit('canvas-data', drawData);
  }
  if (callback) {
    callback();
  }
};

export default handleCanvasData;
