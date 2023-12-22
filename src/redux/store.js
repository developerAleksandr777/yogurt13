import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slicers/authSlice";
import profileSlice from "./slicers/profileSlice";
import crudSlice from "./slicers/crudSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    crud: crudSlice,
  },
});

export default store;
