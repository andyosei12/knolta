import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    navMenuToggle: false,
    loadingSpinner: false,
    httpError: null,
    successRequest: false,
    deleteModal: false,
    confirmDelete: false,
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
    setHttpError(state, action) {
      state.httpError = action.payload;
    },
    setSuccessfulRequest(state) {
      state.successRequest = true;
    },
    removeSuccessfulRequest(state) {
      state.successRequest = false;
    },
    openDeleteModal(state) {
      state.deleteModal = true;
    },
    closeDeleteModal(state) {
      state.deleteModal = false;
    },
    confirmDelete(state) {
      state.confirmDelete = !state.confirmDelete;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
