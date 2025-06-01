import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "./auths";

const initialState = {
  data: [],
  tempTicket: {},
};

const tickets = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicketAction: function (state, action) {
      const newData = {
        ...action.payload,
      };
      state.data.push(newData);
      state.tempTicket = {};
      return state;
    },
    addTempTicketAction: function (state, action) {
      state.tempTicket = { ...state.tempTicket, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser, (state) => {
      state.tempTicket = {};
    });
  },
});

export const { addTicketAction, addTempTicketAction } = tickets.actions;
export default tickets.reducer;
