import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SubProductMasterState,
} from "./types";
import {
  createSubProduct,
  fetchSubProduct,
  fetchSubProductById,
  updateSubProduct,
} from "./thunks";

const initialState: SubProductMasterState = {
  subProducts: [],
  selectedSubProduct: null,
  loading: false,
  error: null,
  loaded: false,
};

const subProductMasterSlice = createSlice({
  name: "subProductMaster",
  initialState,
  reducers: {
    clearSelectedSubProduct(state) {
      state.selectedSubProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch SubProducts
      .addCase(fetchSubProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubProduct.fulfilled, (state, action) => {
        state.subProducts = action.payload.content;
        state.loading = false;
        state.loaded = true;
        state.error = null;
      })
      .addCase(fetchSubProduct.rejected, (state, action) => {
        state.subProducts = [];
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchProductById
      .addCase(fetchSubProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubProductById.fulfilled, (state, action) => {
        state.selectedSubProduct = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSubProductById.rejected, (state, action) => {
        state.selectedSubProduct = null;
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Product
      .addCase(updateSubProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubProduct.fulfilled, (state, action) => {
        const updated = action?.payload?.data;
        const index = state.subProducts.findIndex((p) => p.id === updated?.id);
        if (index !== -1) {
          state.subProducts[index] = updated;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateSubProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Product
      .addCase(createSubProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.subProducts.push(action.payload.data);
      })
      .addCase(createSubProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedSubProduct } = subProductMasterSlice.actions;
export default subProductMasterSlice.reducer;
