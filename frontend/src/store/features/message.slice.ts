import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum EnumMessage {
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS",
  INFORMATION = "INFORMATION",
}

type MessageType = {
  value: string;
  type?: EnumMessage;
  reset?: boolean;
};

const initialState: MessageType = { value: "" };

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, { payload }: PayloadAction<MessageType>) => {
      state.value = payload.value;
      state.type = payload.type ?? undefined;

      if (payload.reset) {
        const key = setTimeout(() => {
          state = initialState;
          clearTimeout(key);
        }, 10000);
      }
    },
    resetMessage: (state) => (state = initialState),
  },
});

export const { setMessage, resetMessage } = messageSlice.actions;

export default messageSlice.reducer;
