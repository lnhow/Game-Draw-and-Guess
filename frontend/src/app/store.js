import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/User/userSlice';
import roomReducer from '../features/room/roomSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
  },
});
