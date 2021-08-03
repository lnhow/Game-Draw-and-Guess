import RoomSocket from '../controllers/room.js';

const handleMessage = (io, socket, { message }, callback) => {
  const user = RoomSocket.getUserBySocketId(socket.id);
  if (user) {
    const containRightAnswer = RoomSocket.verifyCorrectWord(
      user.roomId,
      message,
    );
    if (containRightAnswer) {
      io.to(user.roomId).emit('message', {
        title: user.username,
        message: 'guess the correct word!',
      });
      RoomSocket.setUserIsCorrect(user.id, true);
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
