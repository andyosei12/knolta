import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    navMenuToggle: false,
    loadingSpinner: false,
  },
  reducers: {
    openNavMenu(state) {
      state.navMenuToggle = !state.navMenuToggle;
    },
    closeNavMenu(state) {
      state.navMenuToggle = false;
    },
    showLoadingSpinner(state) {
      state.loadingSpinner = true;
    },
    closeLoadingSpinner(state) {
      state.loadingSpinner = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
