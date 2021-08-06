import { createSlice } from '@reduxjs/toolkit';
import { AVATAR_DEFAULT, NUMBER_RANDOM } from '../../common/constant';

const initialState = {
  isLogin: false,
  isToken:false,
  id: NUMBER_RANDOM,
  username: 'user_' + NUMBER_RANDOM,
  avatar: AVATAR_DEFAULT,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { isLogin, id, username, avatar,isToken } = action.payload;
      if (isLogin !== undefined) state.isLogin = isLogin;
      if (id !== undefined) state.id = id;
      if (isToken !== undefined) state.isToken = isToken;
      if (username !== undefined) state.username = username;
      if (avatar !== undefined) state.avatar = avatar;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
