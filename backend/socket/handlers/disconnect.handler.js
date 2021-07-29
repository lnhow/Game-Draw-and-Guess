import * as UserData from '../data/users.data.js';

const handleDisconnect = (io, socket) => {
  const user = UserData.removeUser(socket.id);
  if (user) {
    // Broadcast to room that user had left
    // Update list of users in room
    io.to(user.room).emit('room-users', {
      room: user.room,
      users: UserData.getUsersInRoom(user.room),
    });
  }
};

export default handleDisconnect;
