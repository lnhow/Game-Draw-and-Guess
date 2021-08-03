import RoomSocket from '../controllers/room.js';
import RoomState from '../../models/roomStateModel.js';
import { getRandomWord } from './word.js';
const oneSecond = 1000;

const HandleGameController = async (io, roomId) => {
  const room = RoomSocket.getRoom(roomId);

  setTimeout(async () => {
    const word = await getRandomWord(room.category);
    const rand = Math.floor(Math.random() * room.users.length);
    const drawerId = room.users[rand].id;
    RoomSocket.setRoomDrawInfo(roomId, drawerId, word);
    const drawer = RoomSocket.getUserById(drawerId);
    console.log(drawer);
    io.to(drawer.socketId).emit('room-draw-word', { word: word });

    console.log(`${roomId}: room-start-round- ${drawerId}`);
    io.to(roomId).emit('room-start-round', { drawerId: drawerId });

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
          io.to(roomId).emit('room-end-round', { word });
          clearInterval(TimerCountdown);
          setTimeout(() => {
            console.log(`${roomId}: room-end-game`);
            io.to(roomId).emit('room-end-game');
            //Temporarily reset back to WAITING
            RoomSocket.updateRoomState(roomId, RoomState.WAITING);
          }, 2 * oneSecond);
        }
      }, oneSecond);
    }, oneSecond);
  }, 2 * oneSecond);
};

export default HandleGameController;
