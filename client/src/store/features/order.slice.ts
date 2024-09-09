import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

// Define a type for the slice state
export type OrderState = {
	current_id?: number
}

// Define the initial state using that type
const initialState: OrderState = {};

export const orderSlice = createSlice<OrderState>({
	name: "OrderState",
	initialState,
	reducers: {
		setCurrentOrderId: (state: OrderState, { payload }: PayloadAction<number>) => {
			state.current_id = payload;
		},
	},
});

export const { setCurrentOrderId } = orderSlice.actions;

export const selectCurrentOrderId = (state: RootState) => state.order.current_id;

export default orderSlice.reducer;
