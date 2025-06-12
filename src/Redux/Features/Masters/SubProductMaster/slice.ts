import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubProductMasterState } from "./types";
import {
  createSubProduct,
  fetchSubProduct,
  fetchSubProductById,
  updateSubProduct,
} from "./thunks";

const initialState: SubProductMasterState = {
  subProducts: [],
  selectedSubProduct: null,
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

const subProductMasterSlice = createSlice({
  name: "subProductMaster",
  initialState,
  reducers: {
    clearSelectedSubProduct(state) {
      state.selectedSubProduct = null;
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
      // fetch SubProducts
      .addCase(fetchSubProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubProduct.fulfilled, (state, action) => {
        const { content, totalPages, totalElements, size, number } =
          action.payload;
        state.subProducts = content;
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
      .addCase(fetchSubProduct.rejected, (state, action) => {
        state.subProducts = [];
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
      .addCase(updateSubProduct.fulfilled, (state) => {
        // const updated = action?.payload?.data;
        // const index = state.subProducts.findIndex((p) => p.id === updated?.id);
        // if (index !== -1) {
        //   state.subProducts[index] = updated;
        // }
        state.loading = false;
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
      .addCase(createSubProduct.fulfilled, (state) => {
        // state.subProducts.push(action.payload.data);
        state.loading = false;
      })
      .addCase(createSubProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedSubProduct, setCurrentPage, setPageSize } =
  subProductMasterSlice.actions;
export default subProductMasterSlice.reducer;
