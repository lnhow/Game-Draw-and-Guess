import RoomUsersModel from '../models/roomUsersModel.js';

const roomUsersController = {
  saveRoomUserData,
};

/**
 * Save room user data to db
 * @param {{
 *  userId: String
 *  roomId: String
 *  point: Number
 *  drawWordId: String
 * }} roomUserData Data of user in room
 */
async function saveRoomUserData(roomUserData) {
  const roomUser = new RoomUsersModel(roomUserData);

  try {
    await roomUser.save();
  } catch (err) {
    console.log(err.message);
  }
}

export default roomUsersController;
