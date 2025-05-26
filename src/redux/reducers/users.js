import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isAuthenticated: false,
  currentUser: null,
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const encodedPassword = btoa(password);
      const user = state.data.find(
        (item) => item.email === email && item.password === encodedPassword
      );
      state.isAuthenticated = !!user;
      state.currentUser = user || null;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

export const { addUser, loginUser, logoutUser } = users.actions;
export default users.reducer;
