import RoomSocket from '../controllers/room.js';

const handleMessage = (io, socket, { message }, callback) => {
  const user = RoomSocket.getUserBySocketId(socket.id);
  if (user) {
    const containRightAnswer = RoomSocket.verifyCorrectWord(
      user.id,
      user.roomId,
      message,
    );
    if (containRightAnswer) {
      io.to(user.roomId).emit('message', {
        title: user.username,
        message: 'guess the correct word!',
      });
      const room = RoomSocket.getRoom(user.roomId);

      RoomSocket.setUserCorrect(user.id, room.roundTimer);
      io.to(user.roomId).emit('room-users', {
        users: RoomSocket.getUsersInRoom(user.roomId),
      });
    } else {
      io.to(user.roomId).emit('message', {
        user: user.username,
        message: message,
      });
    }
  }
  if (callback) {
    callback();
  }
};

export default handleMessage;
