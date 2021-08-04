/**
 * User data service to map each userId to each room
 * For making sure that user do not join multiple room at the same time
 * <key>:<value>
 * userId: {
 *  socketId:...
 *  roomId:...
 *  id:...
 *  username:....
 *  points:....
 *  word:...
 *},
 */

const userRoomMap = new Map();

const UserRoomServices = {
  getUserRoom(userId) {
    return userRoomMap.get(userId);
  },

  hasUserRoom(userId) {
    return userRoomMap.has(userId);
  },

  addUserRoom(user, roomId, socketId) {
    const isInvalidInput =
      !user || !roomId || !user.id || userRoomMap.has(user.id);

    if (isInvalidInput) {
      return null; //Did not add to map
    }

    const newUser = {
      socketId: socketId,
      roomId: roomId,
      id: user.id.toString(),
      username: user.username,
      points: 0,
      isCorrect: false,
      word: '',
    };
    return userRoomMap.set(user.id, newUser);
  },

  removeUserRoom(userId) {
    return userRoomMap.delete(userId);
  },

  setWord(userId, word) {
    let user = this.getUserRoom(userId);
    if (!user) {
      return false;
    }
    user.word = word;
    return true;
  },

  setPoints(userId, points) {
    let user = this.getUserRoom(userId);
    if (!user) {
      return false;
    }
    user.points = points;
    return true;
  },

  setCorrect(userId, correct) {
    let user = this.getUserRoom(userId);
    if (!user) {
      return false;
    }
    user.isCorrect = correct;
    return true;
  },
};

export default UserRoomServices;
