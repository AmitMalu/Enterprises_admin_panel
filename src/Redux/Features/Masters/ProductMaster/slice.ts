import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchProduct,
  fetchProductById,
  updateProduct,
} from "./thunks";
import { ProductMasterState, ProductStateType } from "./types";

const initialState: ProductMasterState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  loaded: false,
};

const productMasterSlice = createSlice({
  name: "productMaster",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<ProductStateType>) => {
          state.loading = false;
          state.products.push(action.payload.data);
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action?.payload?.data;
        const index = state.products.findIndex((p) => p.id === updated?.id);
        if (index !== -1) {
          state.products[index] = updated;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchProducts
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.loaded = true;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.products = [];
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedProduct = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedProduct } = productMasterSlice.actions;
export default productMasterSlice.reducer;
