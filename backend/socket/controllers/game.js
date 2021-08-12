import RoomSocket from '../controllers/room.js';
import RoomState from '../../models/roomStateModel.js';
import { getRandomWord } from './word.js';
import { calcPoints } from './points.js';
import sleep from '../../utils/sleep.js';
const ONE_SECOND = 1000;
const ROUND_TIMEOUT = 5 * ONE_SECOND;

const HandleGameController = async (io, roomId) => {
  const room = RoomSocket.getRoom(roomId);
  if (!room) {
    return;
  }

  RoomSocket.updateRoomState(roomId, RoomState.PLAYING);
  io.to(roomId).emit('room-info', {
    info: RoomSocket.getRoomInfo(roomId),
  });
  io.to(roomId).emit('room-start-game');
  console.log(`Game started in room ${roomId}`);

  for (let i = 0; i < room.users.length; i++) {
    RoomSocket.setRoomRound(roomId, i);
    //Start round
    const word = await handleStartRound(io, roomId, room);
    if (word) {
      //Wait for user to see the start round message
      await sleep(ROUND_TIMEOUT);

      await handleRoundPlaying(io, roomId, room);

      //End round
      handleEndRound(io, roomId, room, word);
      //Wait for user to see the end round message
      await sleep(ROUND_TIMEOUT);
    }
  }

  console.log(`${roomId}: room-end-game`);
  io.to(roomId).emit('room-end-game');
  if (process.env.SERVER_MODE === 'dev') {
    //Don't have to create a new room for dev test
    RoomSocket.updateRoomState(roomId, RoomState.WAITING);
  } else {
    RoomSocket.updateRoomState(roomId, RoomState.ENDED);
  }
};

const handleStartRound = async (io, roomId, room) => {
  const drawerWord = await getRandomWord(room.category);
  const drawerId = randomizeDrawer(roomId); // {_id:"...", word:"..."}

  if (drawerId === null) {
    return null; //All users had been the drawer, stop the game
  }

  RoomSocket.setRoomDrawInfo(roomId, drawerId, drawerWord);
  const drawer = RoomSocket.getUserById(drawerId);
  console.log(drawer);
  RoomSocket.setRoomTimer(roomId, room.timePerRound); //Start timer for the round

  //Send the word to drawer
  io.to(drawer.socketId).emit('room-draw-word', { word: drawerWord.word });

  console.log(`${roomId}: room-start-round- ${drawerId}`);
  io.to(roomId).emit('room-start-round', {
    round: room.currentRound,
    drawerId: drawerId,
  });

  return drawerWord.word;
};

const handleRoundPlaying = async (io, roomId, room) => {
  console.log(`${roomId}: room-start-playing`);
  io.to(roomId).emit('room-start-playing');

  while (room.roundTimer > 0) {
    await sleep(ONE_SECOND);
    const correctUsers = RoomSocket.countCorrectUser(roomId);
    const usersInRoom = room.users.filter((user) => !user.left);
    const isDrawerLeft =
      usersInRoom.filter((user) => user.id === room.currentDrawer).length < 1;

    RoomSocket.decreaseRoomTimer(roomId);
    io.to(roomId).emit('timer', room.roundTimer);
    if (
      room.roundTimer === 0 ||
      correctUsers >= usersInRoom.length - 1 ||
      isDrawerLeft
    ) {
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
    users: RoomSocket.getUserInfosInRoom(roomId),
  });
};

const clearCorrect = (roomUsers) => {
  if (!roomUsers) {
    return;
  }

  for (let i = 0; i < roomUsers.length; i++) {
    RoomSocket.setUserCorrect(roomUsers[i].id, null);
  }
};

/**
 * Choose a random user that is not a drawer before to be the new drawer
 * @param {String} roomId The room to randomize on
 * @returns {String} The drawer's id (null if there is none left)
 */
const randomizeDrawer = (roomId) => {
  const users = RoomSocket.getUsersInRoom(roomId);
  if (!users || users.length === 0) {
    console.log('users');
    console.log(users);
    return null;
  }

  const nonDrawerUsers = users.filter((user) => user.word === '');
  if (!nonDrawerUsers || nonDrawerUsers.length === 0) {
    console.log(nonDrawerUsers);
    return null;
  }

  const rand = Math.floor(Math.random() * nonDrawerUsers.length);
  return nonDrawerUsers[rand].id;
};

export default HandleGameController;
