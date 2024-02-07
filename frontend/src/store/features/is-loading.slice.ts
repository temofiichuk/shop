import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type isLoadingType = {
  value: boolean;
};

const initialState: isLoadingType = {
  value: false,
};

const isLoadingSlice = createSlice({
  name: "is loading",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
