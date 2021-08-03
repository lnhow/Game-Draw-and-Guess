/**
 * May need more verification
 */
import gameroomModel from '../../models/gameroomModel.cjs';
import RoomState from '../../models/roomStateModel.js';

import RoomServices from '../data/room.data.js';
import RoomUsersServices from '../data/roomUsers.data.js';
import SocketUserServices from '../data/socketUser.data.js';

export const addNewRoom = async (roomId, userId) => {
  let result = await gameroomModel.findOne({ _id: roomId }, (err) => {
    if (err) {
      return 400;
    }
  });
  const isInvalidNewRoom =
    !result ||
    result.roomStatus !== RoomState.CREATED ||
    result.hostUserId.toString() !== userId;

  if (isInvalidNewRoom) {
    return 400;
  }

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
  //Save room data to DB...
  console.log(`Room ${roomId} removed`);
  return RoomServices.removeRoom(roomId);
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

export const setRoomDrawInfo = (roomId, drawerId, drawWord) => {
  RoomServices.roomSetDrawInfo(roomId, drawerId, drawWord);
};

export const updateRoomState = (roomId, roomState) => {
  RoomServices.updateRoomState(roomId, roomState);
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
  if (!userId) {
    return;
  }
  RoomUsersServices.removeUserRoom(userId);
  SocketUserServices.removeSocketUser(socketId);
  if (!user) {
    return;
  }
  RoomServices.roomRemoveUser(user.roomId, userId);

  const users = RoomServices.roomGetUsers(user.roomId);
  //TODO: Remove this & handle when room is less than 2 player
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

  const usersInRoom = users
    .map((userId) => getUserInfoById(userId))
    .filter(Boolean); //Filter null...

  return usersInRoom;
};

export const getUserBySocketId = (socketId) => {
  const userId = SocketUserServices.getSocketUser(socketId);
  return getUserInfoById(userId);
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
    username: user.username,
    points: user.points,
    isCorrect: user.isCorrect,
  };
};

export const verifyCorrectWord = (userId, roomId, guess) => {
  const room = getRoom(roomId);
  if (!room || !guess || !userId) {
    return false;
  }
  const roomDrawWord = room.currentDrawWord;
  if (userId === room.currentDrawer) {
    return false;
  }
  return guess.includes(roomDrawWord);
};

export const setUserIsCorrect = (userId, isCorrect) => {
  return RoomUsersServices.setCorrect(userId, isCorrect);
};

export const countCorrectUser = (roomId) => {
  const users = getUsersInRoom(roomId);
  return users.filter((user) => user.isCorrect).length;
};

export const addPointsToUser = (userId, additionalPoints) => {
  const user = getUserById(userId);
  if (user) {
    RoomUsersServices.setPoints(userId, user.points + additionalPoints);
  }
};

const RoomSocketController = {
  addNewRoom,
  removeRoom,
  updateRoomState,
  setRoomDrawInfo,

  getRoom,
  getRoomInfo,
  hasRoomExisted,
  //Users verification
  canRoomBeJoined,
  hasUserJoined,
  //Add & remove
  addUserToRoom,
  removeUserFromRoom,
  verifyCorrectWord,
  setUserIsCorrect,
  countCorrectUser,
  //Get user
  getUsersInRoom,
  getUserBySocketId,
  getUserById,
  getUserInfoById,
  addPointsToUser,
};

export default RoomSocketController;
