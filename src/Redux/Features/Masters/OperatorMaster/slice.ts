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
  },
  extraReducers: (builder) => {
    builder
      // Create Operator
      .addCase(createOperator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOperator.fulfilled, (state, action) => {
        state.loading = false;
        state.operators.push(action.payload.data);
      })
      .addCase(createOperator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Operator
      .addCase(updateOperator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOperator.fulfilled, (state, action) => {
        const updated = action?.payload?.data;
        const index = state.operators.findIndex((p) => p.id === updated?.id);
        if (index !== -1) {
          state.operators[index] = updated;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateOperator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchOperator
      .addCase(fetchOperator.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOperator.fulfilled, (state, action) => {
        state.operators = action.payload.content;
        state.loading = false;
        state.loaded = true;
        state.error = null;
      })
      .addCase(fetchOperator.rejected, (state, action) => {
        state.operators = [];
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchOperatorById
      .addCase(fetchOperatorById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOperatorById.fulfilled, (state, action) => {
        state.selectedOperator = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOperatorById.rejected, (state, action) => {
        state.selectedOperator = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedOperator } = operatorMasterSlice.actions;
export default operatorMasterSlice.reducer;
