import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropdownMasterState } from "../DropdownMaster/types";
import { createDropdownMaster, fetchDropdownList } from "./thunks";

const initialState: DropdownMasterState = {
  dropdownMasterList: [],
  selectedDropdownMaster: null,
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

const dropdownMasterSlice = createSlice({
  name: "dropdownMaster",
  initialState,
  reducers: {
    clearSelectedDropdown(state) {
      state.selectedDropdownMaster = null;
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
      state.selectedDropdownMaster = null;
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

      // fetchOperator
      .addCase(fetchDropdownList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDropdownList.fulfilled, (state, action) => {
        const { content, totalPages, totalElements, size, number } =
          action.payload.data;
        state.dropdownMasterList = content;
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
      .addCase(fetchDropdownList.rejected, (state, action) => {
        state.dropdownMasterList = [];
        state.pagination = {
          totalPages: 0,
          totalElements: 0,
          pageSize: 5,
          currentPage: 1,
        };
        state.loading = false;
        state.error = action.payload as string;
      })

      // // fetchOperatorById
      // .addCase(fetchOperatorById.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(fetchOperatorById.fulfilled, (state, action) => {
      //   state.selectedOperator = action.payload.data;
      //   state.loading = false;
      //   state.error = null;
      // })
      // .addCase(fetchOperatorById.rejected, (state, action) => {
      //   state.selectedOperator = null;
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })

      // Update Operator
      // .addCase(updateOperator.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(updateOperator.fulfilled, (state) => {
      //   // const updated = action?.payload?.data;
      //   // const index = state.operators.findIndex((p) => p.id === updated?.id);
      //   // if (index !== -1) {
      //   //   state.operators[index] = updated;
      //   // }
      //   state.loaded = false;
      //   state.loading = false;
      //   state.error = null;
      // })
      // .addCase(updateOperator.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })

      // Create Operator
      .addCase(createDropdownMaster.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDropdownMaster.fulfilled, (state) => {
        // state.operators.push(action.payload.data);
        state.loading = false;
        state.loaded = false;
      })
      .addCase(createDropdownMaster.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearSelectedDropdown,
  setCurrentPage,
  setPageSize,
  resetAllStates,
  setLoaded,
} = dropdownMasterSlice.actions;
export default dropdownMasterSlice.reducer;
