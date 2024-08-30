import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

// Define a type for the slice state
export type IsOpenState = Record<string, boolean>


// Define the initial state using that type
const initialState: IsOpenState = {};

export const isOpenSlice = createSlice<IsOpenState>({
	name: "IsOpenState",
	initialState,
	reducers: {
		toggle: (state: IsOpenState, { payload: key }: PayloadAction<string>) => {
			state[key] = !state[key];
		},
		set: (state: IsOpenState, { payload }: PayloadAction<{ key: string, value: boolean }>) => {
			state[payload.key] = payload.value;
		},
		show: (state: IsOpenState, { payload }: PayloadAction<string>) => {
			state[payload] = true;
		},
		hide: (state: IsOpenState, { payload }: PayloadAction<string>) => {
			state[payload] = false;
		},
	},
});

export const { toggle, show, hide, set } = isOpenSlice.actions;

export const selectIsOpen = (key: string) => (state: RootState) => state.isOpen[key];

export default isOpenSlice.reducer;
