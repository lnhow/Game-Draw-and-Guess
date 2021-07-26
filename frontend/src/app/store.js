import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/User/testUserSlice';
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter:counterReducer
  },
});
