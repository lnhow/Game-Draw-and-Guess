import RoomSocket from '../controllers/room.js';
import RoomState from '../../models/roomStateModel.js';
import { getRandomWord } from './word.js';
import sleep from '../../utils/sleep.js';
const ONE_SECOND = 1000;
const ROUND_TIMEOUT = 5 * ONE_SECOND;

const HandleGameController = async (io, roomId) => {
  const room = RoomSocket.getRoom(roomId);

  //Start round
  const word = await handleStartRound(io, roomId, room);
  //Wait for user to see the start round message
  await sleep(ROUND_TIMEOUT);

  await handleRoundPlaying(io, roomId, room);

  //End round
  handleEndRound(io, roomId, room, word);
  //Wait for user to see the end round message
  await sleep(ROUND_TIMEOUT);

  console.log(`${roomId}: room-end-game`);
  io.to(roomId).emit('room-end-game');
  //Temporarily reset back to WAITING
  RoomSocket.updateRoomState(roomId, RoomState.WAITING);
};

const handleStartRound = async (io, roomId, room) => {
  const word = await getRandomWord(room.category);
  //Get random user in room
  //TODO: Handle when drawer user left?
  const rand = Math.floor(Math.random() * room.users.length);
  const drawerId = room.users[rand].id;

  RoomSocket.setRoomDrawInfo(roomId, drawerId, word);
  const drawer = RoomSocket.getUserById(drawerId);
  console.log(drawer);
  RoomSocket.setRoomTimer(roomId, room.timePerRound); //Start timer for the round

  //Send the word to drawer
  io.to(drawer.socketId).emit('room-draw-word', { word: word });

  console.log(`${roomId}: room-start-round- ${drawerId}`);
  io.to(roomId).emit('room-start-round', { drawerId: drawerId });
  return word;
};

const handleRoundPlaying = async (io, roomId, room) => {
  console.log(`${roomId}: room-start-playing`);
  io.to(roomId).emit('room-start-playing');

  while (room.roundTimer > 0) {
    await sleep(ONE_SECOND);
    const correctUsers = RoomSocket.countCorrectUser(roomId);

    RoomSocket.decreaseRoomTimer(roomId);
    io.to(roomId).emit('timer', room.roundTimer);
    if (room.roundTimer === 0 || correctUsers >= room.users.length - 1) {
      break;
    }
  }
};

const handleEndRound = (io, roomId, room) => {
  console.log(`${roomId}: room-end-round`);
  io.to(roomId).emit('room-end-round', {
    word: room.currentDrawWord,
  });

  calcPoints(room);
  clearCorrect(room.users);
  RoomSocket.setRoomDrawInfo(roomId, null, null);

  io.to(roomId).emit('room-users', {
    users: RoomSocket.getUsersInRoom(roomId),
  });
};

const calcPoints = (room) => {
  const drawer = room.currentDrawer;
  const users = room.users;
  const basePoints = 10;
  let totalRoundPoints = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].left || users[i].id === drawer) {
      continue;
    }
    //Calc points for guessers
    let user = RoomSocket.getUserById(users[i].id);
    if (user.correctTime) {
      const userPoints = user.correctTime * basePoints;
      totalRoundPoints += userPoints;
      RoomSocket.addPointsToUser(users[i].id, userPoints);
    }
  }

  //Calc points for drawer
  const drawerPoints = Math.floor(
    //Minus 1 drawer
    totalRoundPoints / (users.length - 1),
  );
  RoomSocket.addPointsToUser(drawer, drawerPoints);
};

const clearCorrect = (roomUsers) => {
  if (!roomUsers) {
    return;
  }

  for (let i = 0; i < roomUsers.length; i++) {
    RoomSocket.setUserCorrect(roomUsers[i].id, null);
  }
};

export default HandleGameController;
