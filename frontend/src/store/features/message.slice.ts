import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum EnumMessage {
	FAILURE = "FAILURE",
	SUCCESS = "SUCCESS",
	INFORMATION = "INFORMATION",
}

type MessageType = {
	value: string;
	type: EnumMessage;
	reset?: boolean;
	timer?: number;
};

const initialState: MessageType = {
	value: "",
	reset: true,
	type: EnumMessage.INFORMATION,
	timer: 5000,
};

const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		setMessage: (state, { payload }: PayloadAction<MessageType>) => {
			state.value = payload.value;
			state.type = payload.type;
			if (payload.reset) state.reset = payload.reset;
			if (payload.timer) state.timer = payload.timer;
		},
		resetMessage: (state) => {
			state.value = initialState.value;
			state.type = initialState.type;
			state.reset = initialState.reset;
			state.timer = initialState.timer;
		},
	},
});

export const { setMessage, resetMessage } = messageSlice.actions;

export default messageSlice.reducer;
