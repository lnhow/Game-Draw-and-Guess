const users = [];

export const addUser = ({ id, name, room }) => {
  try {
    const normalizedUsername = name.trim().toLowerCase();
    const normalizedRoomName = room.trim().toLowerCase();

    if (!normalizedUsername || !normalizedRoomName) {
      return { error: 'Username and room are required.' };
    }

    const user = { id, name: normalizedUsername, room: normalizedRoomName };

    users.push(user);

    return { user };
  } catch (error) {
    console.error(error);
    return { error: 'Server error' };
  }
};

/**
 * Remove user
 * @param {user's unique id} id
 * @returns The removed user object
 */
export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

export const getUser = (id) => users.find((user) => user.id === id);

export const getUsersInRoom = (room) =>
  users.filter((user) => user.room === room);
