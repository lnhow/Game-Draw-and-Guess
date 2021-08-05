import RoomSocket from '../controllers/room.js';
import SocketMessage from '../controllers/message.js';

const handleMessage = (io, socket, { message }, callback) => {
  const user = RoomSocket.getUserBySocketId(socket.id);
  if (user) {
    const containRightAnswer = RoomSocket.verifyCorrectWord(
      user.id,
      user.roomId,
      message,
    );

    if (containRightAnswer) {
      const room = RoomSocket.getRoom(user.roomId);
      const isDrawer = room.currentDrawer === user.id;
      if (user.isCorrect || isDrawer) {
        // A user who is already correct or the drawer
        // send another message contains the right anwser
        SocketMessage.emitBlockedMessage(
          io,
          socket.id,
          "Shh. Don't spoil the answer to others.",
        );
      } else {
        SocketMessage.emitCorrectMessage(io, user);

        RoomSocket.setUserCorrect(user.id, room.roundTimer);
        SocketMessage.emitRoomUserInfos(io, user.roomId);
      }
    } else {
      SocketMessage.emitChatMessage(io, user, message);
    }
  }
  if (callback) {
    callback();
  }
};

export default handleMessage;
