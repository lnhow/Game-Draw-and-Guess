import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null,
  roomState: null,
  roomRound: null,
  roundTimer: null,
  hostUserId: null,
  drawerWord: '',
  messages: [],
  users: [],
};

export const RoomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    updateRoom(state, action) {
      const { roomId, roomState, roomRound, hostUserId } = action.payload;

      if (roomId) state.roomId = roomId;
      if (roomState) state.roomState = roomState;
      if (roomRound) state.roomRound = roomRound;
      if (hostUserId) state.hostUserId = hostUserId;
    },

    updateRoomUsers(state, action) {
      const { users } = action.payload;
      if (users) state.users = users;
    },

    addMessage(state, action) {
      const message = action.payload;
      if (message) state.messages = [...state.messages, message];
    },

    clearRoom(state) {
      return initialState;
    },
  },
});

export const { updateRoom, updateRoomUsers, addMessage, clearRoom } =
  RoomSlice.actions;

export default RoomSlice.reducer;
