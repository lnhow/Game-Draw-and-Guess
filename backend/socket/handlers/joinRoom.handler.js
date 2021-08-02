import * as UserData from '../data/users.data.js';
import * as RoomData from '../data/room.data.js';
import gameroomModel from '../models/gameroomModel.cjs';

const handleJoinRoom = (io, socket, { id, name, room }, callback) => {
  console.log(`User [${name}] want to join room [${room}]`);
  const hostId = '6102512706219fb15414d197';
  const roomId = '60fe2664ef197c52240d1087';
  console.log(hostId, roomId);
  //Temporarily use socket.id as user id

  const { user, error } = UserData.addUser({
    socketId: socket.id,
    name,
    room,
    id,
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
