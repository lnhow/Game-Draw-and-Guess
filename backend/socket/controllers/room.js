/**
 * May need more verification
 */
import gameroomModel from '../../models/gameroomModel.cjs';
import roomUsersController from '../../controllers/roomUsersController.js';
import RoomState from '../../models/roomStateModel.js';
import mongoose from 'mongoose';

import RoomServices from '../data/room.data.js';
import RoomUsersServices from '../data/roomUsers.data.js';
import SocketUserServices from '../data/socketUser.data.js';

export const addNewRoom = async (roomId, userId) => {
  let result = await gameroomModel.findOne({ _id: roomId }, (err) => {
    if (err) {
      return 404;
    }
  });

  if (!result) {
    return 404;
  }

  if (result.roomStatus === RoomState.ENDED) {
    return 400; //This game room is already used
  }

  if (result.hostUserId.toString() !== userId) {
    return 401; //The host has not joined this room yet
  }

  updateRoomStateToDB(roomId, RoomState.WAITING);
  //Server data automatically set room state to WAITING when joinned
  const newRoom = {
    id: result._id,
    category: result.categoryId,
    timePerRound: result.timePerRound,
    hostUserId: result.hostUserId,
  };
  if (!RoomServices.addRoom(newRoom)) {
    return 500;
  }
  return 200;
};

export const removeRoom = (roomId) => {
  saveRemovedRoom(roomId);
  console.log(`Room ${roomId} removed`);
  return RoomServices.removeRoom(roomId);
};

export const saveRemovedRoom = (roomId) => {
  const room = getRoom(roomId);
  if (!room) {
    return; //Room not found, stop saving
  }

  const saveRoomData = {
    roomStatus: RoomState.ENDED,
  };

  gameroomModel.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(roomId),
    },
    saveRoomData,
    (err) => {
      if (err) {
        console.log(`Room ${roomId}: Err saving to db. ${err.message}`);
      } else {
        console.log(`Room ${roomId}: Saved to DB`);
      }
    },
  );
};

export const getRoom = (roomId) => {
  return RoomServices.getRoom(roomId);
};

export const getRoomInfo = (roomId) => {
  const room = RoomServices.getRoom(roomId);
  return {
    roomId,
    roomState: room.status,
    roomRound: room.currentRound,
    hostUserId: room.hostUserId,
  };
};

/**
 * Set room's current draw info or clear it's current draw info
 * & associate the drawer with the word's id
 * @param {String} roomId The id of the room to set the draw info
 * @param {String} drawerId The id of the drawer to set, null to clear room's current Drawer
 * @param {{
 *  id: String,
 *  word: String
 * }} drawWord The simple representation of the draw word to set, left null to clear room's current Draw Word
 */
export const setRoomDrawInfo = (roomId, drawerId, drawWord) => {
  const word = drawWord ? drawWord.word : null;
  if (drawWord) {
    RoomUsersServices.setWord(drawerId, drawWord.id);
  }
  RoomServices.roomSetDrawInfo(roomId, drawerId, word);
};

/**
 * Update a room's state both in server & database
 * @param {String} roomId The id of the room
 * @param {RoomState} roomState The new state of the room
 */
export const updateRoomState = (roomId, roomState) => {
  updateRoomStateToDB(roomId, roomState);
  RoomServices.updateRoomState(roomId, roomState);
};

/**
 * Update a room's state to database
 * @param {String} roomId The id of the room
 * @param {RoomState} roomState The new state of the room
 */
export const updateRoomStateToDB = async (roomId, roomState) => {
  await gameroomModel.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(roomId),
    },
    {
      roomStatus: roomState,
    },
  );
};

export const hasRoomExisted = (roomId) => {
  return RoomServices.hasRoom(roomId);
};

export const hasUserJoined = (userId) => {
  return RoomUsersServices.hasUserRoom(userId);
};

export const canRoomBeJoined = (roomId) => {
  const room = RoomServices.getRoom(roomId);
  return room && room.status === RoomState.WAITING;
};

export const addUserToRoom = (socketId, roomId, user) => {
  //Add to user info map, then socket info & then to room
  RoomUsersServices.addUserRoom(user, roomId, socketId);
  SocketUserServices.addSocketUser(socketId, user.id);
  RoomServices.roomAddUser(roomId, user.id);

  // console.log(RoomServices.getRoom(roomId));
};

export const removeUserFromRoom = (socketId) => {
  const userId = SocketUserServices.getSocketUser(socketId);
  const user = RoomUsersServices.getUserRoom(userId);

  //Remove user info & then socket info & then remove from room
  if (!userId || !user) {
    return;
  }

  //Save user to DB (if possible)
  roomUsersController.saveRoomUserData({
    userId: userId,
    roomId: user.roomId,
    point: user.points,
    drawWordId: user.word,
  });

  RoomUsersServices.removeUserRoom(userId);
  SocketUserServices.removeSocketUser(socketId);
  RoomServices.roomRemoveUser(user.roomId, userId);

  const users = RoomServices.roomGetUsers(user.roomId);
  if (!users || users.length < 1) {
    removeRoom(user.roomId);
  }

  return user.roomId; //Room removed from
};

export const getUsersInRoom = (roomId) => {
  const users = RoomServices.roomGetUsers(roomId);
  if (!users) {
    return [];
  }

  const userNotLeft = users.filter((user) => !user.left);
  const usersInRoom = userNotLeft
    .map((userId) => getUserById(userId))
    .filter(Boolean); //Filter null...

  return usersInRoom;
};

export const getUserInfosInRoom = (roomId) => {
  const users = RoomServices.roomGetUsers(roomId);
  if (!users) {
    return [];
  }

  const userNotLeft = users.filter((user) => !user.left);
  const usersInRoom = userNotLeft
    .map((userId) => getUserInfoById(userId))
    .filter(Boolean); //Filter null...

  return usersInRoom;
};

export const getUserBySocketId = (socketId) => {
  const userId = SocketUserServices.getSocketUser(socketId);
  return getUserById(userId);
};

export const getRoomBySocketId = (socketId) => {
  const userId = SocketUserServices.getSocketUser(socketId);
  if (userId) {
    const user = RoomUsersServices.getUserRoom(userId);
    if (user) {
      return user.roomId;
    }
  }
  return null;
};

export const getUserById = (userId) => {
  const user = RoomUsersServices.getUserRoom(userId);
  if (!user) {
    return null;
  }

  return user;
};

export const getUserInfoById = (userId) => {
  const user = RoomUsersServices.getUserRoom(userId);
  if (!user) {
    return null;
  }

  return {
    roomId: user.roomId,
    id: userId,
    avatar: user.avatar,
    username: user.username,
    points: user.points,
    isCorrect: Boolean(user.correctTime),
  };
};

export const verifyCorrectWord = (userId, roomId, guess) => {
  const room = getRoom(roomId);
  if (!room || !guess || !userId) {
    return false;
  }

  const roomDrawWord = room.currentDrawWord;
  const isNotValidDrawWord =
    !roomDrawWord || roomDrawWord === '' || typeof roomDrawWord != 'string';
  if (isNotValidDrawWord) {
    return false;
  }

  const formattedGuess = guess.toUpperCase();
  const formattedDrawWord = roomDrawWord.toUpperCase();

  return formattedGuess.includes(formattedDrawWord);
};

export const setUserCorrect = (userId, correctTime = null) => {
  return RoomUsersServices.setCorrect(userId, correctTime);
};

export const countCorrectUser = (roomId) => {
  const users = getUserInfosInRoom(roomId);
  return users.filter((user) => user.isCorrect).length;
};

export const addPointsToUser = (userId, additionalPoints) => {
  const user = getUserById(userId);
  if (user) {
    RoomUsersServices.setPoints(userId, user.points + additionalPoints);
  }
};

export const setRoomTimer = (roomId, timer) => {
  RoomServices.roomSetTimer(roomId, timer);
};

export const setRoomRound = (roomId, currentRound = -1) => {
  RoomServices.roomSetCurrentRound(roomId, currentRound);
};

export const decreaseRoomTimer = (roomId, value = 1) => {
  RoomServices.roomDecreaseTimer(roomId, value);
};

const RoomSocketController = {
  addNewRoom,
  removeRoom,
  updateRoomState,
  setRoomDrawInfo,

  getRoom,
  getRoomInfo,
  hasRoomExisted,
  setRoomRound,
  setRoomTimer,
  decreaseRoomTimer,
  //Users verification
  canRoomBeJoined,
  hasUserJoined,
  //Add & remove
  addUserToRoom,
  removeUserFromRoom,
  verifyCorrectWord,
  setUserCorrect,
  countCorrectUser,
  //Get user
  getUsersInRoom,
  getUserInfosInRoom,
  getUserBySocketId,
  getRoomBySocketId,
  getUserById,
  getUserInfoById,
  addPointsToUser,
};

export default RoomSocketController;
