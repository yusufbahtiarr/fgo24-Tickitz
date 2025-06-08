import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const films = createSlice({
  name: "films",
  initialState,
  reducers: {
    addFilmAction: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addFilmAction } = films.actions;
export default films.reducer;
