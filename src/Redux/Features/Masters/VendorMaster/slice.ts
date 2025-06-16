import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VendorMasterState } from "./types";
import {
  createVendor,
  fetchVendor,
  fetchVendorById,
  updateVendor,
} from "./thunks";

const initialState: VendorMasterState = {
  vendors: [],
  selectedVendor: null,
  pagination: {
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
    currentPage: 1,
  },
  loading: false,
  error: null,
  loaded: false,
};

const vendorMasterSlice = createSlice({
  name: "vendorMaster",
  initialState,
  reducers: {
    clearSelectedVendor(state) {
      state.selectedVendor = null;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.pagination.currentPage = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pagination.pageSize = action.payload;
    },
    setLoaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
    },
    resetAllStates(state) {
      state.selectedVendor = null;
      state.pagination = {
        totalPages: 0,
        totalElements: 0,
        pageSize: 5,
        currentPage: 1,
      };
      state.loading = false;
      state.error = null;
      state.loaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch Vendor
      .addCase(fetchVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendor.fulfilled, (state, action) => {
        const { content, totalPages, totalElements, size, number } =
          action.payload.data;
        state.vendors = content;
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
      .addCase(fetchVendor.rejected, (state, action) => {
        state.vendors = [];
        state.pagination = {
          totalPages: 0,
          totalElements: 0,
          pageSize: 5,
          currentPage: 1,
        };
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchVendorById
      .addCase(fetchVendorById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        state.selectedVendor = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.selectedVendor = null;
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Vendor
      .addCase(updateVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVendor.fulfilled, (state) => {
        state.loading = false;
        state.loaded = false;
        state.error = null;
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Vendor
      .addCase(createVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVendor.fulfilled, (state) => {
        // state.vendors.push(action.payload.data);
        state.loading = false;
        state.loaded = false;
      })
      .addCase(createVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearSelectedVendor,
  setCurrentPage,
  setPageSize,
  resetAllStates,
  setLoaded,
} = vendorMasterSlice.actions;
export default vendorMasterSlice.reducer;
