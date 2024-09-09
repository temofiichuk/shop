import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

// Define a type for the slice state
export type State = Record<string, unknown>
export type PayloadState = Record<string, unknown>

// Define the initial state using that type
const initialState: State = {};

export const stateSlice = createSlice<State>({
	name: "StateSlice",
	initialState,
	reducers: {
		set: (state: State, { payload }: PayloadAction<{ key: string, value: unknown }>) => {
			state[payload.key] = payload.value;
		},
		remove: (state: State, { payload }: PayloadAction<string>) => {
			delete state[payload];
		},
	},
});

export const { remove, set } = stateSlice.actions;

export const selectState = (key?: string) => (state: RootState) => key ? state.state[key] : undefined;

export default stateSlice.reducer;
