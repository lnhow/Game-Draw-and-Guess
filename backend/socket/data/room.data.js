/**
 * <key>:<value>
 * roomId: {
 *  category: ...
 *  timePerRound: ...
 *  hostUserId: ...
 *  currentRound: 0,1,2,3,4,...
 *  users: [
 *    { _id:...
 *      username:....
 *      points:....
 *      word:...
 *    },
 *    ...
 *  ]
 * }
 */

const rooms = new Map();

export const addRoom = (room, hostInfo) => {
  const roomId = room.roomId;
  rooms.set(roomId, {
    category: room.category,
    timePerRound: room.timePerRound,
    hostUserId: room.hostUserId,
    currentRound: 0,
    status: 'WAITING',
    users: [hostInfo],
  });
};

export const getRoom = (roomId) => {
  return rooms.get(roomId);
};

//Random word ...
//updateUser in room

//deleteUser from room
//removeRoom from map
//....
