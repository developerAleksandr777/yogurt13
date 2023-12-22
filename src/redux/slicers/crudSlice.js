import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crud: [],
};

const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    GET_CRUD_ACTION(state, action) {
      state.crud = action.payload;
    },
    CREATE_CRUD_ACTION(state, action) {
      state.crud = [action.payload, ...state.crud];
    },
  },
});

export const { GET_CRUD_ACTION, CREATE_CRUD_ACTION } = crudSlice.actions;
export default crudSlice.reducer;
