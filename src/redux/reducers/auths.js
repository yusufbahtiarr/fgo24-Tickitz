// features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const auths = createSlice({
  name: "auths",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginUser, logoutUser } = auths.actions;
export default auths.reducer;
