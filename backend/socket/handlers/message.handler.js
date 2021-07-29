import * as UserData from '../data/users.data.js';

const handleMessage = (io, socket, { message }, callback) => {
  const user = UserData.getUser(socket.id);
  if (user) {
    io.to(user.room).emit('message', {
      user: user.name,
      message: message,
    });
  }
  if (callback) {
    callback();
  }
};

export default handleMessage;
