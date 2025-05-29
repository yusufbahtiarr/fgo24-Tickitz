import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const tickets = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicketAction: function (state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const { addTicketAction } = tickets.actions;
export default tickets.reducer;
