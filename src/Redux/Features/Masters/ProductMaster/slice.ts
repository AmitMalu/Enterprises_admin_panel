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
  pagination: {
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
    currentPage: 1,
  },
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
    setCurrentPage(state, action: PayloadAction<number>) {
      state.pagination.currentPage = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pagination.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // fetchProducts
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const { content, totalPages, totalElements, size, number } =
          action.payload;
        state.products = content;
        state.pagination = {
          totalPages,
          totalElements,
          pageSize: size,
          currentPage: number + 1, // Convert 0-based to 1-based
        };
        state.loading = false;
        state.loaded = true;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.products = [];
        state.pagination = {
          totalPages: 0,
          totalElements: 0,
          pageSize: 10,
          currentPage: 1,
        };
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
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        // const updated = action?.payload?.data;
        // const index = state.products.findIndex((p) => p.id === updated?.id);
        // if (index !== -1) {
        //   state.products[index] = updated;
        // }
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        // state.products.push(action.payload.data);
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedProduct, setCurrentPage, setPageSize } =
  productMasterSlice.actions;
export default productMasterSlice.reducer;
