import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  data: [
    {
      id: "AD-11111111",
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
      newData.id = "US-" + nanoid();
      newData.role = "User";
      newData.password = window.btoa(newData.password);
      state.data.push(newData);
      return state;
    },
    editUserAction: (state, action) => {
      const { email, firstName, lastName, phone, newPassword } = action.payload;

      const userIndex = state.data.findIndex((item) => item.email === email);

      if (userIndex === -1) return state;

      if (newPassword !== "") {
        state.data[userIndex].password = window.btoa(newPassword);
      }
      state.data[userIndex] = {
        ...state.data[userIndex],
        firstName: firstName || state.data[userIndex].firstName,
        lastName: lastName || state.data[userIndex].lastName,
        phone: phone || state.data[userIndex].phone,
      };

      // if (state.currentUser?.email === email) {
      //   state.currentUser = { ...state.data[userIndex] };
      // }

      // console.log(state.currentUser);
      // console.log(state.data[userIndex]);

      return state;
    },
  },
});

export const { addUserAction, editUserAction } = users.actions;
export default users.reducer;
