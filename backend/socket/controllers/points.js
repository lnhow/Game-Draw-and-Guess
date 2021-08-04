import RoomSocket from '../controllers/room.js';

export const calcPoints = (room) => {
  const drawer = room.currentDrawer;
  const users = room.users;
  const basePoints = 10;
  let totalRoundPoints = 0;
  let guesserCount = 0; //Account for when user has left
  for (let i = 0; i < users.length; i++) {
    if (users[i].left || users[i].id === drawer) {
      continue;
    }
    //Calc points for guessers
    let user = RoomSocket.getUserById(users[i].id);
    if (user.correctTime) {
      const userPoints = user.correctTime * basePoints;
      totalRoundPoints += userPoints;
      RoomSocket.addPointsToUser(users[i].id, userPoints);
    }
    guesserCount++;
  }

  //Calc points for drawer
  const drawerPoints = Math.floor(totalRoundPoints / guesserCount);
  RoomSocket.addPointsToUser(drawer, drawerPoints);
};
