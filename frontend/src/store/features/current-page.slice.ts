import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CurrentPageType = {
	slug?: string;
};

const initialState: CurrentPageType = {
	slug: process.env.NEXT_PUBLIC_MAIN_PAGE,
};

const authSlice = createSlice({
	name: "Current page",
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<CurrentPageType>) => {
			state.slug = action.payload.slug;
		},
	},
});

export const { setPage } = authSlice.actions;

export default authSlice.reducer;
