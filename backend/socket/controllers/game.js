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
        const correctUsers = RoomSocket.countCorrectUser(roomId);

        counter--;
        io.to(roomId).emit('timer', counter);
        if (counter === 0 || correctUsers >= room.users.length - 1) {
          //End the round
          handleEndRound(io, roomId, room, word);
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

const handleEndRound = (io, roomId, room, word) => {
  console.log(`${roomId}: room-end-round`);
  io.to(roomId).emit('room-end-round', { word });

  calcPoints(room);
  clearCorrect(room.users);

  io.to(roomId).emit('room-users', {
    users: RoomSocket.getUsersInRoom(roomId),
  });
};

const calcPoints = (room) => {
  const drawer = room.currentDrawer;
  const users = room.users;
  const basePoints = 10;
  let correctUserCount = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].left || users[i].id === drawer) {
      continue;
    }
    //Calc points for guessers
    let user = RoomSocket.getUserById(users[i].id);
    if (user.isCorrect) {
      RoomSocket.addPointsToUser(users[i].id, basePoints);
      correctUserCount++;
    }
  }

  //Calc points for drawer
  const drawerPoints = Math.floor(
    //Minus 1 drawer
    (basePoints * correctUserCount) / (users.length - 1),
  );
  RoomSocket.addPointsToUser(drawer, drawerPoints);
};

const clearCorrect = (roomUsers) => {
  if (!roomUsers) {
    return;
  }

  for (let i = 0; i < roomUsers.length; i++) {
    RoomSocket.setUserIsCorrect(roomUsers[i].id, false);
  }
};

export default HandleGameController;
