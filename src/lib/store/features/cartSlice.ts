// lib/store/features/auth/authSlice.ts
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface CartState {
  data: Array<any>;
}

// Define the initial state using that type
const initialState: CartState = {
  data: [],
};

// TODO: WINDOW>LOCALSTORAGE IN SLICES
let myData;
try {
  myData = localStorage.getItem("cartItem") || [];
} catch (error) {
  console.log("CAN'T FIND ITEMS : ", error);
}

const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.data.push(action.payload);
      let cartItems = JSON.stringify(current(state).data);
      localStorage.setItem("cartItem", cartItems);
      console.log("cart itmes in store: ", current(state).data);
    },
    removeAllProductsFromCart(state) {
      state.data = [];
      localStorage.setItem("cartItem", JSON.stringify([]));
    },
    removeCartItem(state, action) {
      state.data = state.data.filter((item) => item.itemId !== action.payload);
      let cartItems = JSON.stringify(current(state).data);
      localStorage.setItem("cartItem", cartItems);
    },
  },
});

export const { setCartItems, removeAllProductsFromCart, removeCartItem } =
  cartItemSlice.actions;

export default cartItemSlice.reducer;
