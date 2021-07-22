import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'user_' + Math.floor(Math.random() * 10000),
  avatar:
    'https://www.google.com/imgres?imgurl=https%3A%2F%2Fe7.pngegg.com%2Fpngimages%2F84%2F165%2Fpng-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png&imgrefurl=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fpng-zxkcc&tbnid=RdHRQ2dJN7LFaM&vet=12ahUKEwjD6s3TwPPxAhXJFHIKHVTqBZEQMygFegUIARDTAQ..i&docid=diHpHgcvAOmZ-M&w=900&h=512&q=avatar%20png&ved=2ahUKEwjD6s3TwPPxAhXJFHIKHVTqBZEQMygFegUIARDTAQ',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      //action.payload => {newUserName:'...'}
      const { newUserName } = action.payload;
      state.username = newUserName;
    },
    updateUser: (state) => {
      state.value -= 1;
    },
    // removeUser: (state, action) => {
    //   state.value += action.payload
    // },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserName, updateUser } = userSlice.actions;

export default userSlice.reducer;
