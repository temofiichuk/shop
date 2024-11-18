import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "@/store/features/state.slice";

// export const persistConfig = {
// 	key: "root",
// 	storage,
// };

const store = configureStore({
	reducer: {
		state: stateSlice,
	},
	devTools: true,
});

// export const persistor = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
