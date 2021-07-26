import { createSlice } from '@reduxjs/toolkit';
import { AVATAR_DEFAULT, NUMBER_RANDOM } from '../../common/constant';

const initialState = {
isLogin:false,
  username: 'user_' + NUMBER_RANDOM,
  avatar: AVATAR_DEFAULT,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      //action.payload => {newUserName:'...'}
      const { isLogin,username,avatar } = action.payload;
      if(isLogin) state.isLogin = isLogin
      if(username) state.username = username
      if(avatar) state.avatar = avatar
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
