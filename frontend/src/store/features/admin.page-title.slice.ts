import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type adminPageTitleType = {
  value: string | null;
};

const initialState: adminPageTitleType = {
  value: null,
};

const authSlice = createSlice({
  name: "admin page title",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<adminPageTitleType>) => {
      state.value = action.payload.value;
    },
  },
});

export const { setTitle } = authSlice.actions;

export default authSlice.reducer;
