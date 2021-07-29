import { createSlice } from '@reduxjs/toolkit';
import { AVATAR_DEFAULT, NUMBER_RANDOM } from '../../common/constant';

const initialState = {
  isLogin: false,
  username: 'user_' + NUMBER_RANDOM,
  avatar: AVATAR_DEFAULT,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { isLogin, username, avatar } = action.payload;
      if (isLogin !== undefined) state.isLogin = isLogin;
      if (username !== undefined) state.username = username;
      if (avatar !== undefined) state.avatar = avatar;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
