import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EnumUserRole, UserResponseType } from "@/types/auth.types";

type authType = {
  user: UserResponseType | null;
};
// const user = getUser();

// const initialState: authType = {
//   user: {
//     id: 1,
//     name: "john",
//     email: "@",
//     role: EnumUserRole.ADMIN,
//   },
// };

const initialState: authType = {
  user: null,
};

const authSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    login: (state, action: PayloadAction<UserResponseType>) => {
      state.user = action.payload;
    },
  },
});

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;
