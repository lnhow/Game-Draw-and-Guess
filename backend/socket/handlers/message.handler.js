import RoomSocket from '../controllers/room.js';

const handleMessage = (io, socket, { message }, callback) => {
  const user = RoomSocket.getUserBySocketId(socket.id);
  if (user) {
    io.to(user.roomId).emit('message', {
      user: user.username,
      message: message,
    });
  }
  if (callback) {
    callback();
  }
};

export default handleMessage;
