import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    items: [],
  },
  reducers: {},
});

export default eventSlice.reducer;
