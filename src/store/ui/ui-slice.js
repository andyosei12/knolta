import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    navMenuToggle: false,
  },
  reducers: {
    openNavMenu(state) {
      state.navMenuToggle = !state.navMenuToggle;
    },
    closeNavMenu(state) {
      state.navMenuToggle = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
