import * as UserData from '../data/users.data.js';
/**
 * User want to join room
 */
const handleJoinRoom = (io, socket, { name, room }, callback) => {
  console.log(`User [${name}] want to join room [${room}]`);
  const hostId = '6102512706219fb15414d197';
  const roomId = '60fe2664ef197c52240d1087';
  console.log(hostId, roomId);
  //Temporarily use socket.id as user id

  //Check user already joins a room (in user map)
  //Check if room map contain roomId
  //If room exists in map, return 2: normal user
  //If room not exists in map, call db to find room
  // -> room exists in db -> check roomStatus: CREATED -> hostUserId = userId join, return 1: host user
  //If room not exist in db, throw error msg: return 0

  // If not error msg
  // If return 1: Save retrieved room from db -> room map & Update room status: WAITING to DB

  // Save userId -> user map
  // Add userInfo to room in room map
  // Join user to room
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
