import RoomSocket from '../controllers/room.js';
import RoomServices from '../data/room.data.js';
import RoomState from '../../models/roomStateModel.js';
const oneSecond = 1000;

const HandleGameController = (io, roomId) => {
  const room = RoomSocket.getRoom(roomId);

  setTimeout(() => {
    console.log(`${roomId}: room-start-round`);
    io.to(roomId).emit('room-start-round');
    setTimeout(() => {
      console.log(`${roomId}: room-start-playing`);
      io.to(roomId).emit('room-start-playing');

      var counter = room.timePerRound;
      var TimerCountdown = setInterval(function () {
        io.to(roomId).emit('timer', counter);
        counter--;
        if (counter === 0) {
          //End the round
          console.log(`${roomId}: room-end-round`);
          io.to(roomId).emit('room-end-round');
          clearInterval(TimerCountdown);
          setTimeout(() => {
            console.log(`${roomId}: room-end-game`);
            io.to(roomId).emit('room-end-game');
            //Temporarily reset back to WAITING
            RoomServices.updateRoomState(roomId, RoomState.WAITING);
          }, 2 * oneSecond);
        }
      }, oneSecond);
    }, oneSecond);
  }, 2 * oneSecond);
};

export default HandleGameController;
