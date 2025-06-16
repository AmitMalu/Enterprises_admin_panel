import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createOperator,
  fetchOperator,
  fetchOperatorById,
  updateOperator,
} from "./thunks";
import { OperatorMasterState } from "./types";

const initialState: OperatorMasterState = {
  operators: [],
  selectedOperator: null,
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

const operatorMasterSlice = createSlice({
  name: "operatorMaster",
  initialState,
  reducers: {
    clearSelectedOperator(state) {
      state.selectedOperator = null;
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
      state.selectedOperator = null;
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
      .addCase(fetchOperator.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOperator.fulfilled, (state, action) => {
        const { content, totalPages, totalElements, size, number } =
          action.payload.data;
        state.operators = content;
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
      .addCase(fetchOperator.rejected, (state, action) => {
        state.operators = [];
        state.pagination = {
          totalPages: 0,
          totalElements: 0,
          pageSize: 5,
          currentPage: 1,
        };
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchOperatorById
      .addCase(fetchOperatorById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOperatorById.fulfilled, (state, action) => {
        state.selectedOperator = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOperatorById.rejected, (state, action) => {
        state.selectedOperator = null;
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Operator
      .addCase(updateOperator.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOperator.fulfilled, (state) => {
        // const updated = action?.payload?.data;
        // const index = state.operators.findIndex((p) => p.id === updated?.id);
        // if (index !== -1) {
        //   state.operators[index] = updated;
        // }
        state.loaded = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateOperator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Operator
      .addCase(createOperator.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOperator.fulfilled, (state) => {
        // state.operators.push(action.payload.data);
        state.loading = false;
        state.loaded = false;
      })
      .addCase(createOperator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearSelectedOperator,
  setCurrentPage,
  setPageSize,
  resetAllStates,
  setLoaded,
} = operatorMasterSlice.actions;
export default operatorMasterSlice.reducer;
