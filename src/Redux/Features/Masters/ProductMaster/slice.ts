import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "./thunks";
import { productMasterState } from "./types";

const initialState: productMasterState = {
  products: [],
  fetchProductStatus: "idle", // idle | loading | succeeded | failed
  fetchProductError: null,
};

const productMasterSlice = createSlice({
  name: "productMaster",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state: any, action) => {
        state.products = action.payload;
        state.fetchProductStatus = "succeeded";
      })
      .addCase(fetchProduct.rejected, (state: any, action) => {
        state.fetchProductStatus = "failed";
        state.fetchProductError = action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.fetchProductStatus = "loading";
      });
  },
});

export default productMasterSlice.reducer;
