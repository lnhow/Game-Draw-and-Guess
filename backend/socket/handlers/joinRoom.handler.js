import { subcribeCallback, isValidRoomId } from '../../utils/helpers.js';

import RoomSocket from '../controllers/room.js';

const handleJoinRoom = async (io, socket, { user, roomId }, callback) => {
  console.log(
    `User [${user.id}. ${user.username}] want to join room [${roomId}]`,
  );
  const clientCallback = subcribeCallback(callback);

  if (!isValidRoomId(roomId)) {
    clientCallback(`Invalid roomId: ${roomId}`);
    return;
  }

  if (RoomSocket.hasUserJoined(user.id)) {
    clientCallback(`You has already joined a room`);
    return;
  }

  if (!RoomSocket.hasRoomExisted(roomId)) {
    //Room not exist in server data: New room, fetch from db
    const result = await RoomSocket.addNewRoom(roomId, user.id);
    if (result === 400) {
      clientCallback(`Invalid roomId: ${roomId}`);
      return;
    } else if (result === 500) {
      clientCallback(`Server internal Error. roomId: ${roomId}`);
      return;
    }
  }

  if (!RoomSocket.canRoomBeJoined(roomId)) {
    clientCallback(`Room ${roomId} cannot be joined`);
    return;
  }

  RoomSocket.addUserToRoom(socket.id, roomId, user);
  socket.join(roomId);

  console.log(`User [${user.id}] joined room [${roomId}]`);
  io.to(socket.id).emit('room-info', {
    info: RoomSocket.getRoomInfo(roomId),
  });

  // Update list of users in room
  io.to(roomId).emit('room-users', {
    users: RoomSocket.getUserInfosInRoom(roomId),
  });
  callback();
};

export default handleJoinRoom;
