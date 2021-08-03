import { createSlice } from '@reduxjs/toolkit';
import { RoomStates, RoomScreenStates } from '../../common/constant';

const initialState = {
  roomId: null,
  roomState: null,
  roomRound: null,
  roundTimer: null,
  hostUserId: null,
  drawerId: null,
  drawerWord: null,
  messages: [],
  users: [],
};

export const RoomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    updateRoom(state, action) {
      const { roomId, roomState, roomRound, hostUserId, drawerId, drawerWord } =
        action.payload;

      if (roomId) state.roomId = roomId;
      if (roomState) {
        state.roomState = convertRoomToScreenState(roomState);
      }
      if (roomRound) state.roomRound = roomRound;
      if (hostUserId) state.hostUserId = hostUserId;
      if (drawerId) state.drawerId = drawerId;
      if (drawerWord) state.drawerWord = drawerWord;
    },

    updateRoomUsers(state, action) {
      const { users } = action.payload;
      if (users) state.users = users;
    },

    updateTimer(state, action) {
      const { timer } = action.payload;
      if (timer) state.roundTimer = timer;
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

const convertRoomToScreenState = (roomState) => {
  if (roomState === RoomStates.WAITING) {
    return RoomScreenStates.WAITING;
  } else if (roomState === RoomStates.PLAYING) {
    return RoomScreenStates.GAME_STARTED;
  } else if (roomState === RoomStates.ENDED) {
    return RoomScreenStates.GAME_ENDED;
  }
  return roomState; //No need to convert
};

export const {
  updateRoom,
  updateRoomUsers,
  addMessage,
  updateTimer,
  clearRoom,
} = RoomSlice.actions;

export default RoomSlice.reducer;
