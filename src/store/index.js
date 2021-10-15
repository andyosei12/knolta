import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "./ui/ui-slice";

const store = configureStore({
  reducer: { ui: uiSliceReducer },
});

export default store;
