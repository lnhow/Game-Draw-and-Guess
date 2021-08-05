import RoomSocket from '../controllers/room.js';
import { subcribeCallback } from '../../utils/helpers.js';
import HandleGameController from '../controllers/game.js';

const handleStartGame = (io, socket, callback) => {
  const user = RoomSocket.getUserBySocketId(socket.id);
  if (!user) {
    return;
  }
  const room = RoomSocket.getRoom(user.roomId);
  const clientCallback = subcribeCallback(callback);
  if (!room) {
    clientCallback('Room do not exist');
  }

  console.log(`${user.id} want to start game in room ${user.roomId}`);
  const isHostStartGame = user.id === room.hostUserId;
  const isRoomValidToStart =
    isHostStartGame && room.users && room.users.length > 1;
  //More validate
  if (!isRoomValidToStart) {
    return;
  }

  HandleGameController(io, user.roomId);

  //Check room contains more 2 user, else throw err msg
  //Update room status: PLAYING, no more new user can join
  //Get random word by room category & assign to users
  //Randomize users draw order
  //Send Start game signal to users in room
  //[Loop]
  //Start round: Send startRound signal{Drawer's userId...., [round timer] to client}
  //Send word to Drawer only (Drawer cannot chat)
  //Reset [round timer]
  //Clear client draw data
  //From now, chat message have to be verify if contain draw word
  //If contain draw word, send right answer signal to client (The guesser now cannot chat anymore)
  //(When round timer end) or (numberOfRightAnswer == num users in room)
  // Send round end signal{Drawer's Word}
  // [num round]++
  //If [num round] < users.length in room: [Loop]
  // If [num round] === users.length: Send end game signal {users in room}, Client display leaderboard
  // Save room info,.... to db
  // Remove room from map
  // Kick users
};

export default handleStartGame;
