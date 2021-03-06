import RoomSocket from '../controllers/room.js';
import SocketMessage from '../controllers/message.js';

const handleDisconnect = (io, socket) => {
  const user = RoomSocket.getUserBySocketId(socket.id);
  const room = RoomSocket.removeUserFromRoom(socket.id);

  if (!user) {
    return;
  }

  console.log(`User [${user.id}. ${user.username}] left room [${room}]`);
  // Broadcast to room that user had left
  SocketMessage.emitLeftMessage(io, room, user.username);

  // Update list of users in room
  console.log(
    `Users left in room ${room}: ${RoomSocket.getUserInfosInRoom(room).length}`,
  );
  SocketMessage.emitRoomUserInfos(io, room);
};

export default handleDisconnect;
