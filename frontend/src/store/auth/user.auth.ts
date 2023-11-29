import { createSlice } from "@reduxjs/toolkit";

type LoginUserResponse = {
  user: {
    name: string;
    email: string;
  };
  access_token: string;
  refresh_token: string;
};

const initialState: Partial<LoginUserResponse> = {};

const slice = createSlice({
  name: "authUser",
  initialState,
  reducers: {},
});

export const authReducer = slice.reducer;
