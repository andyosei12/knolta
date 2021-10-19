import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "./ui/ui-slice";
import eventsSliceReducer from "./events-slice";

const store = configureStore({
  reducer: { ui: uiSliceReducer, event: eventsSliceReducer },
});

export default store;
