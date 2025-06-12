import { createSlice } from "@reduxjs/toolkit";
import { VendorMasterState } from "./types";
import { createVendor, fetchVendor, fetchVendorById, updateVendor } from "./thunks";

const initialState: VendorMasterState = {
  vendors: [],
  selectedVendor: null,
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
  },
  extraReducers: (builder) => {
    builder
      // Create Vendor
      .addCase(createVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors.push(action.payload.data);
      })
      .addCase(createVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Vendor
      .addCase(updateVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetch Vendor
      .addCase(fetchVendor.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendor.fulfilled, (state, action) => {
        state.vendors = action.payload.content;
        state.loading = false;
        state.loaded = true;
        state.error = null;
      })
      .addCase(fetchVendor.rejected, (state, action) => {
        state.vendors = [];
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchVendorById
      .addCase(fetchVendorById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        state.selectedVendor = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.selectedVendor = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedVendor } = vendorMasterSlice.actions;
export default vendorMasterSlice.reducer;
