import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/features/auth.slice";
import typeOfFormSlice from "@/store/features/type-of-auth-form.slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import isLoadingSlice from "@/store/features/is-loading.slice";
import isOpenSlice from "@/store/features/is-open.slice";
import messageSlice from "@/store/features/message.slice";
import currentPageSlice from "@/store/features/current-page.slice";

export const persistConfig = {
	key: "root",
	storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
	reducer: {
		typeOfForm: typeOfFormSlice,
		auth: persistedAuthReducer,
		isLoading: isLoadingSlice,
		isOpen: isOpenSlice,
		message: messageSlice,
		currentPage: currentPageSlice,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
			serializableCheck: {
				ignoreActions: true,
			},
		}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
