// lib/store/features/auth/authSlice.ts
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface CartQuntityState {
  quantity: number;
}

// Define the initial state using that type
const initialState: CartQuntityState = {
  quantity: 0,
};

const cartQuntitySlice = createSlice({
  name: "cartQuntity",
  initialState,
  reducers: {
    addToCartQuantity(state, action) {
      state.quantity += action.payload;
      let cartQuntity = JSON.stringify(current(state).quantity);
      localStorage.setItem("cartQuantity", cartQuntity);
    },
    removeFromCartQuantity(state, action) {
      state.quantity -= action.payload;

      let cartQuntity = JSON.stringify(current(state).quantity);
      localStorage.setItem("cartQuantity", cartQuntity);
    },
  },
});

export const { addToCartQuantity, removeFromCartQuantity } =
  cartQuntitySlice.actions;

export default cartQuntitySlice.reducer;
