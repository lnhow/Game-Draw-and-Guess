import RoomSocket from '../controllers/room.js';

const handleDisconnect = (io, socket) => {
  const user = RoomSocket.getUserBySocketId(socket.id);
  const room = RoomSocket.removeUserFromRoom(socket.id);

  if (user) {
    console.log(`User [${user.id}. ${user.username}] left room [${room}]`);
  }
  // Broadcast to room that user had left
  // Update list of users in room
  console.log(RoomSocket.getUserInfosInRoom(room));
  io.to(room).emit('room-users', {
    users: RoomSocket.getUserInfosInRoom(room),
  });
};

export default handleDisconnect;
