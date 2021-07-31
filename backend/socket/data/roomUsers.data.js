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

//Temporarily ONLY, do not use array
// const users = [];

// export const addUser = ({ id, name, room }) => {
//   try {
//     const normalizedUsername = name.trim().toLowerCase();
//     const normalizedRoomName = room.trim().toLowerCase();

//     if (!normalizedUsername || !normalizedRoomName) {
//       return { error: 'Username and room are required.' };
//     }

//     const user = {
//       id,
//       name: normalizedUsername,
//       room: normalizedRoomName,
//       points: 0,
//     };

//     users.push(user);

//     return { user };
//   } catch (error) {
//     console.error(error);
//     return { error: 'Server error' };
//   }
// };

// /**
//  * Remove user
//  * @param {user's unique id} id
//  * @returns The removed user object
//  */
// export const removeUser = (id) => {
//   const index = users.findIndex((user) => user.id === id);

//   if (index !== -1) return users.splice(index, 1)[0];
// };

// export const getUser = (id) => users.find((user) => user.id === id);

// export const getUsersInRoom = (room) =>
//   users.filter((user) => user.room === room);
