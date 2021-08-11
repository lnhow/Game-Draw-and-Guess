import { subcribeCallback, isValidRoomId } from '../../utils/helpers.js';
import authController from '../../controllers/authControllers.js';
import RoomSocket from '../controllers/room.js';
import SocketMessage from '../controllers/message.js';

const handleJoinRoom = async (io, socket, { user, roomId }, callback) => {
  console.log(
    `User [${user.id}. ${user.username}] want to join room [${roomId}]`,
  );
  const clientCallback = subcribeCallback(callback);

  if (!isValidRoomId(roomId)) {
    authController.deleteAnonymousUser(user.id);
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
      authController.deleteAnonymousUser(user.id);
      clientCallback(`This game room had already ended. RoomId: ${roomId}`);
      return;
    } else if (result === 401) {
      authController.deleteAnonymousUser(user.id);
      clientCallback(
        `The host has not joined this room yet.\n RoomId: ${roomId}`,
      );
      return;
    } else if (result === 404) {
      authController.deleteAnonymousUser(user.id);
      clientCallback(`Room not found.\n RoomId: ${roomId}`);
      return;
    } else if (result === 500) {
      authController.deleteAnonymousUser(user.id);
      clientCallback(`Server internal Error. RoomId: ${roomId}`);
      return;
    }
  }

  if (!RoomSocket.canRoomBeJoined(roomId)) {
    authController.deleteAnonymousUser(user.id);
    clientCallback(`Room ${roomId} cannot be joined`);
    return;
  }

  RoomSocket.addUserToRoom(socket.id, roomId, user);
  socket.join(roomId);

  console.log(`User [${user.id}] joined room [${roomId}]`);
  io.to(socket.id).emit('room-info', {
    info: RoomSocket.getRoomInfo(roomId),
  });

  SocketMessage.emitJoinMessage(io, roomId, user.username);
  // Update list of users in room
  SocketMessage.emitRoomUserInfos(io, roomId);
  callback();
};

export default handleJoinRoom;
