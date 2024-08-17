import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";
import sessionReducer from "./features/sessionSlice";
import cartQuntityReducer from "./features/cartQuantitySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      cartItem: cartReducer,
      cartQuantity: cartQuntityReducer,
      session: sessionReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
