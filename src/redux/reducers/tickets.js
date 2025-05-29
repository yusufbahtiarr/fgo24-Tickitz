import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
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
        id: "TK-" + nanoid(),
        createdAt: new Date().toISOString(),
      };
      state.data.push(newData);
      initialState.tempTicket;
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
