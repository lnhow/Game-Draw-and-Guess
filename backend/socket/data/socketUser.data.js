/**
 * Socket user data service to map each socket to userId
 * For handling event that don't send userId
 * <key>:<value>
 * socket.id: userId
 */
const socketUserMap = new Map();

const SocketUserServices = {
  getSocketUser(socketId) {
    return socketUserMap.get(socketId);
  },

  addSocketUser(socketId, userId) {
    const isInvalidInput = !socketId || !userId || socketUserMap.has(socketId);

    if (isInvalidInput) {
      return null; //Did not add to map
    }
    return socketUserMap.set(socketId, userId.toString());
  },

  removeSocketUser(socketId) {
    return socketUserMap.delete(socketId);
  },
};

export default SocketUserServices;
