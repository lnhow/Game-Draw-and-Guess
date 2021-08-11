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
    console.log(
      `User ${roomUserData.userId} - Room ${roomUserData.roomId}: Saved to DB`,
    );
  } catch (err) {
    console.log(
      `User ${roomUserData.userId} - Room ${roomUserData.roomId}: Err saving to db. ${err.message}`,
    );
  }
}

export default roomUsersController;
