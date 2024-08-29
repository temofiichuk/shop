import { configureStore } from "@reduxjs/toolkit";
import IsOpenSlice from "@/store/features/isOpen.slice";
import { useDispatch, useSelector } from "react-redux";

// export const persistConfig = {
// 	key: "root",
// 	storage,
// };

const store = configureStore({
	reducer: {
		isOpen: IsOpenSlice,
	},
	devTools: true,

});

// export const persistor = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector = useSelector<RootState>;

export default store;
