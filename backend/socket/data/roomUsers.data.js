/**
 * User data service to map each userId to each room
 * For making sure that user do not join multiple room at the same time
 * <key>:<value>
 * userId: {
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

  addUserRoom(user, roomId) {
    const isInvalidInput =
      !user || !roomId || !user.id || userRoomMap.has(user.id);

    if (isInvalidInput) {
      return null; //Did not add to map
    }

    const newUser = {
      roomId: roomId,
      id: user.id.toString(),
      username: user.username,
      points: 0,
      word: '',
    };
    return userRoomMap.set(user.id, newUser);
  },

  removeUserRoom(userId) {
    return userRoomMap.delete(userId);
  },
};

export default UserRoomServices;
