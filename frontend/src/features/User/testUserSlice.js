import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: 'username123'
}

export const UserSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateUser: (state,action) => {
        state.username = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser} = UserSlice.actions

export default UserSlice.reducer