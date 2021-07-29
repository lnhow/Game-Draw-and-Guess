import * as UserData from '../data/users.data.js';

const handleCanvasData = (io, socket, drawData, callback) => {
  const user = UserData.getUser(socket.id);
  if (user) {
    io.to(user.room).emit('canvas-data', drawData);
  }
  if (callback) {
    callback();
  }
};

export default handleCanvasData;
