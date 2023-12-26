import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: localStorage.getItem("token") || null,
  errors: {},
  authErr: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AUTH_TOKEN_ACTION(state, action) {
      state.auth = action.payload;
      localStorage.setItem("token", action.payload);
    },
    REMOVE_TOKEN_ACTION(state, action) {
      state.auth = null;
      localStorage.removeItem("token");
    },
    AUTH_ERRORS_ACTION(state, action) {
      state.errors = action.payload;
    },
    ERRORS_ACTION(state, action) {
      console.log(action.payload);
      state.authErr = action.payload;
    },
  },
});

export const {
  ERRORS_ACTION,
  AUTH_TOKEN_ACTION,
  AUTH_ERRORS_ACTION,
  REMOVE_TOKEN_ACTION,
} = authSlice.actions;
export default authSlice.reducer;
