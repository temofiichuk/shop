import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsOpenType = {
	[key: string]: boolean;
};

const initialState: IsOpenType = {
	navbar: false,
	navMenu: false,
	navMenuMobile: false,
};

const authSlice = createSlice({
	name: "admin page title",
	initialState,
	reducers: {
		setIsOpen: (state, action: PayloadAction<IsOpenType>) => {
			for (const key in action.payload) {
				const typedKey = key as keyof IsOpenType;
				state[typedKey] = action.payload[typedKey];
			}
		},
		toggleIsOpen: (state, action: PayloadAction<keyof IsOpenType>) => {
			state[action.payload] = !state[action.payload];
		},
	},
});

export const { setIsOpen, toggleIsOpen } = authSlice.actions;

export default authSlice.reducer;
