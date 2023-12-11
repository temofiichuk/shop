import { configureStore } from "@reduxjs/toolkit";
import RootReducers from "./redocers/index";

const makeStore = () => {
  return configureStore({
    reducer: RootReducers,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export default makeStore;
