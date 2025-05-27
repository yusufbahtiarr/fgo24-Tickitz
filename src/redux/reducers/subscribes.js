import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  data: [],
};

const subscribes = createSlice({
  name: "subscribes",
  initialState,
  reducers: {
    addSubscribeAction: (state, action) => {
      const newData = action.payload;
      newData.id = nanoid();
      state.data.push(newData);
      return state;
    },
  },
});

export const { addSubscribeAction } = subscribes.actions;
export default subscribes.reducer;
