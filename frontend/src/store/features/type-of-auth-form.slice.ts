import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum EnumTypeOfForm {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

type TypeOfForm = {
  value: EnumTypeOfForm | null;
};

const initialState: TypeOfForm = { value: null };

const typeOfFormSlice = createSlice({
  name: "Type Of Authorization Form",
  initialState,
  reducers: {
    changeType: (state, action: PayloadAction<EnumTypeOfForm>) => {
      state.value = action.payload;
    },
  },
});

export const { changeType } = typeOfFormSlice.actions;

export default typeOfFormSlice.reducer;
