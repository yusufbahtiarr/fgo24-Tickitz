import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  data: [],
  isAuthenticated: false,
  currentUser: null,
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUserAction: (state, action) => {
      const newData = action.payload;
      newData.id = nanoid();
      newData.role = "User";
      newData.password = window.btoa(newData.password);
      state.data.push(newData);
      return state;
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const encodedPassword = btoa(password);
      // console.log(email);
      // console.log(password);

      const user = state.data.find(
        (item) => item.email === email && item.password === encodedPassword
      );
      // console.log(user);

      state.isAuthenticated = !!user;
      // console.log(state.isAuthenticated);

      state.currentUser = user || null;
      // console.log(state.currentUser);
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

export const { addUserAction, loginUser, logoutUser } = users.actions;
export default users.reducer;
