// lib/store/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface initialStateInterface {
  mySession: any;
}

const initialState: initialStateInterface = {
  mySession: {},
};

const sessionSlice = createSlice({
  name: "mysession",
  initialState,
  reducers: {
    setMySession: (state, action) => {
      state.mySession = action.payload;
    },
    removeMySession: (state) => {
      state.mySession = {};
    },
  },
});

export const { setMySession, removeMySession } = sessionSlice.actions;

export default sessionSlice.reducer;
