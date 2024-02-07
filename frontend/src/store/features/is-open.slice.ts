import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsOpenType = {
  navbar: boolean;
};

export type IsOpenPayloadActionType = {
  [key in keyof IsOpenType]: boolean;
};

const initialState: IsOpenType = {
  navbar: false,
};

const authSlice = createSlice({
  name: "admin page title",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<IsOpenPayloadActionType>) => {
      for (const key in action.payload) {
        const typedKey = key as keyof IsOpenType;
        state[typedKey] = action.payload[typedKey];
      }
    },
  },
});

export const { setIsOpen } = authSlice.actions;

export default authSlice.reducer;
