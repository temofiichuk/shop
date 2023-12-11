import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUserResponseType } from "@/types/auth.types";

type authType = {
  value: AuthUserResponseType | null;
};

// const initialState: authType = {
//   value: {
//     user: {
//       id: 1,
//       name: "john",
//       email: "@",
//       role: EnumUserRole.ADMIN,
//     },
//     accessToken: "",
//     refreshToken: "",
//   },
// };

const initialState: authType = {
  value: null,
};

const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    logout: (state) => {
      state.value = initialState.value;
    },
    login: (state, action: PayloadAction<AuthUserResponseType>) => {
      state.value = action.payload;
    },
  },
});

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;
