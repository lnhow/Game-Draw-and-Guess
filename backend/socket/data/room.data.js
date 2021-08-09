/**
 * <key>:<value>
 * roomId: {
 *  category: ...
 *  timePerRound: ...
 *  hostUserId: ...
 *  currentRound: 0,1,2,3,4,...
 *  users: [
 *    {
 *      id:...,
 *      left: [true/false] <--Hidden from outside
 *    },
 *    ...
 *  ]
 * }
 */
import RoomState from '../../models/roomStateModel.js';
const roomMap = new Map();

const RoomServices = {
  getRoom(roomId) {
    return roomMap.get(roomId);
  },

  hasRoom(roomId) {
    return roomMap.has(roomId);
  },

  addRoom(room) {
    const isInvalidInput =
      !room || //Passed room is a falsy value
      !room.id || //Passed roomId is a falsy value
      roomMap.has(room.id); //Map already contain the roomId

    if (isInvalidInput) {
      return null; //Did not add to map
    }

    const roomId = room.id.toString();
    return roomMap.set(roomId, {
      category: room.category.toString(),
      timePerRound: room.timePerRound,
      hostUserId: room.hostUserId.toString(),
      currentRound: -1,
      roundTimer: null,
      currentDrawWord: '',
      currentDrawer: null,
      status: RoomState.WAITING,
      users: [],
    });
  },

  updateRoomState(roomId, roomState) {
    const room = roomMap.get(roomId);
    if (room) {
      room.status = roomState;
    }
  },

  removeRoom(roomId) {
    return roomMap.delete(roomId);
  },

  roomAddUser(roomId, userId) {
    const isInvalidInput =
      !roomId ||
      !userId ||
      !roomMap.has(roomId) ||
      this.roomHasUser(roomId, userId);

    if (isInvalidInput) {
      return null; //Did not add to map
    }

    const room = this.getRoom(roomId);

    room.users.push({
      id: userId,
      left: false,
    });
    return userId;
  },

  roomHasUser(roomId, userId) {
    return this.roomGetUser(roomId, userId) ? true : false;
  },

  roomGetUsers(roomId) {
    const room = this.getRoom(roomId);
    if (!room) {
      return false;
    }

    return room.users.filter((user) => !user.left).map((user) => user.id);
  },

  roomGetUser(roomId, userId) {
    const room = this.getRoom(roomId);
    if (!room) {
      return false;
    }

    const user = room.users.find((user) => user.id === userId);
    return user && !user.left ? user.id : null;
  },

  roomSetDrawInfo(roomId, drawerId, drawWord) {
    const room = this.getRoom(roomId);
    if (!room) {
      return false;
    }

    room.currentDrawer = drawerId;
    room.currentDrawWord = drawWord;
  },

  roomGetDrawerUser(roomId) {
    const room = this.getRoom(roomId);
    if (!room) {
      return null;
    }
    return room.currentDrawer;
  },

  roomGetDrawWord(roomId) {
    const room = this.getRoom(roomId);
    if (!room) {
      return null;
    }
    return room.currentDrawWord;
  },

  roomRemoveUser(roomId, userId) {
    const room = this.getRoom(roomId);
    if (!room) {
      return false;
    }

    const user = room.users.find((user) => user.id === userId);
    if (user) {
      user.left = true;
      return true;
    }
    return false;
  },

  roomSetTimer(roomId, timer) {
    const room = this.getRoom(roomId);
    if (!room) {
      return false;
    }

    room.roundTimer = timer;
  },

  roomDecreaseTimer(roomId, value) {
    const room = this.getRoom(roomId);
    if (!room) {
      return false;
    }

    room.roundTimer -= value;
  },

  roomSetCurrentRound(roomId, currentRound) {
    const room = this.getRoom(roomId);
    if (!room) {
      return false;
    }

    room.currentRound = currentRound;
  },
};

export default RoomServices;

//Random word ...
//updateUser in room

//deleteUser from room
//removeRoom from map
//....
