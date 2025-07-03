import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubOperatorMasterState } from "./types";
import {
  createSubOperator,
  fetchSubOperator,
  fetchSubOperatorById,
  updateSubOperator,
} from "./thunks";

const initialState: SubOperatorMasterState = {
  subOperators: [],
  selectedSubOperator: null,
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

const subOperatorMasterSlice = createSlice({
  name: "operatorMaster",
  initialState,
  reducers: {
    clearSelectedSubOperator(state) {
      state.selectedSubOperator = null;
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
      state.selectedSubOperator = null;
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

      // fetchSubOperator
      .addCase(fetchSubOperator.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubOperator.fulfilled, (state, action) => {
        const { content, totalPages, totalElements, size, number } =
          action.payload.data;
        state.subOperators = content;
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
      .addCase(fetchSubOperator.rejected, (state, action) => {
        state.subOperators = [];
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchSubOperatorById
      .addCase(fetchSubOperatorById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubOperatorById.fulfilled, (state, action) => {
        state.selectedSubOperator = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSubOperatorById.rejected, (state, action) => {
        state.selectedSubOperator = null;
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Operator
      .addCase(updateSubOperator.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubOperator.fulfilled, (state) => {
        // const updated = action?.payload?.data;
        // const index = state.operators.findIndex((p) => p.id === updated?.id);
        // if (index !== -1) {
        //   state.operators[index] = updated;
        // }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateSubOperator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Operator
      .addCase(createSubOperator.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubOperator.fulfilled, (state) => {
        // state.operators.push(action.payload.data);
        state.loading = false;
      })
      .addCase(createSubOperator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearSelectedSubOperator,
  setCurrentPage,
  setPageSize,
  resetAllStates,
  setLoaded,
} = subOperatorMasterSlice.actions;

export default subOperatorMasterSlice.reducer;
