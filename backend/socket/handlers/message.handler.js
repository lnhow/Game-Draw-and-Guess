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
      if (user.isCorrect) {
        // A user who is already correct
        // send another message contains the right anwser
        SocketMessage.emitBlockedMessage(
          io,
          socket.id,
          "Shh. Don't spoil the answer to others.",
        );
      } else {
        SocketMessage.emitCorrectMessage(io, user);

        const room = RoomSocket.getRoom(user.roomId);
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
