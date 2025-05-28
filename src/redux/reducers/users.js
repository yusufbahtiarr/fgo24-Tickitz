import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  data: [
    {
      id: "11111111",
      email: "admin@gmail.com",
      password: "YWRtaW4=",
      role: "Admin",
    },
  ],
  // currentUser: null,
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
    editUserAction: (state, action) => {
      console.log(action.payload);

      const { email, firstname, lastname, phone, newpassword } = action.payload;

      const userIndex = state.data.findIndex((item) => item.email === email);

      if (userIndex === -1) return state;

      if (newpassword !== "") {
        state.data[userIndex].password = window.btoa(newpassword);
      }

      state.data[userIndex] = {
        ...state.data[userIndex],
        firstname: firstname || state.data[userIndex].firstname,
        lastname: lastname || state.data[userIndex].lastname,
        phone: phone || state.data[userIndex].phone,
      };

      if (state.currentUser?.email === email) {
        state.currentUser = { ...state.data[userIndex] };
      }

      // console.log(state.currentUser);
      // console.log(state.data[userIndex]);

      return state;
    },

    // loginUser: (state, action) => {
    //   const { email } = action.payload;

    //   const user = state.data.find((item) => item.email === email);

    //   state.currentUser = user || null;
    // },
    // logoutUser: (state) => {
    //   state.currentUser = null;
    // },
  },
});

export const { addUserAction, editUserAction } = users.actions;
export default users.reducer;
