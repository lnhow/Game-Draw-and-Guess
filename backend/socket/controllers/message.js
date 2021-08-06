import { SpecialMessage } from '../../utils/constants.js';
import RoomSocket from './room.js';

export const emitChatMessage = (io, user, message) => {
  io.to(user.roomId).emit('message', {
    user: {
      id: user.id,
      username: user.username,
    },
    message: message,
  });
};

export const emitCorrectMessage = (io, user) => {
  io.to(user.roomId).emit('message', {
    type: SpecialMessage.CORRECT_GUESS,
    user: {
      id: user.id,
      username: user.username,
    },
  });
};

export const emitBlockedMessage = (io, socketId, reason) => {
  io.to(socketId).emit('message', {
    type: SpecialMessage.BLOCKED,
    message: reason,
  });
};

export const emitJoinMessage = (io, roomId, joinedUsername) => {
  io.to(roomId).emit('message', {
    type: SpecialMessage.JOIN_ROOM,
    title: joinedUsername,
  });
};

export const emitLeftMessage = (io, roomId, leftUsername) => {
  io.to(roomId).emit('message', {
    type: SpecialMessage.LEFT_ROOM,
    title: leftUsername,
  });
};

export const emitRoomUserInfos = (io, roomId) => {
  io.to(roomId).emit('room-users', {
    users: RoomSocket.getUserInfosInRoom(roomId),
  });
};

const SocketMessage = {
  emitChatMessage,
  emitCorrectMessage,
  emitBlockedMessage,
  emitJoinMessage,
  emitLeftMessage,
  emitRoomUserInfos,
};

export default SocketMessage;
