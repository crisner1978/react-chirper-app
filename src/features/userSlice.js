import { createSlice } from "@reduxjs/toolkit";


export const AUTHED_USER = "tylermcginnis";
const initialState = {
  authedUser: null,
  isAuthenticated: false,
  users: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthedUser: (state, { payload }) => {
      state.authedUser = payload;
      state.isAuthenticated = true;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setAuthedUser, setUsers } = userSlice.actions;

export default userSlice.reducer;

export const selectAuthedUser = (state) => state.user.authedUser;

export const selectUsers = (state) => state.user.users;
