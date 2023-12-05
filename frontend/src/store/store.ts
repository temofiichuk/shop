import { configureStore, createStore } from "@reduxjs/toolkit";
import RootReducers from "./redocers/index";

const store = configureStore({
  reducer: RootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
