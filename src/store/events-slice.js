import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
  },
  reducers: {
    getEvents(state, action) {
      state.events = action.payload;
    },
  },
});

export const eventActions = eventSlice.actions;

export default eventSlice.reducer;
