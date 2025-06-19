import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "./Thunk";

const initialState = {
  createUserStatus: "idle",
  createUserError: null,
};

const managementReducer = createSlice({
  name: "management",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state) => {})
      .addCase(createUser.rejected, (state, action) => {})
      .addCase(createUser.pending, (state) => {});
  },
});

export default managementReducer.reducer;
