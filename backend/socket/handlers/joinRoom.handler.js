import * as UserData from '../data/users.data.js';

const handleJoinRoom = (io, socket, { name, room }, callback) => {
  console.log(`User [${name}] want to join room [${room}]`);
  //Temporarily use socket.id as user id
  const { user, error } = UserData.addUser({
    id: socket.id,
    name,
    room,
  });

  if (error) {
    return callback(error);
  }

  socket.join(user.room);
  console.log(`User [${user.name}] joined room [${user.room}]`);
  // Update list of users in room
  io.to(user.room).emit('room-users', {
    room: user.room,
    users: UserData.getUsersInRoom(user.room),
  });
  callback();
};

export default handleJoinRoom;
