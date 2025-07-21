import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser } from "./Thunk";
import { RootState } from "../../Store/store";

type Pagination = {
  totalPages: number;
  totalElements: number;
  pageSize: number;
  currentPage: number;
};

type ManagementMeta = {
  pagination: Pagination;
};

export type ManagementState = {
  meta: Record<string, ManagementMeta>;
  [key: string]: any;
};

const initialState: ManagementState = {
  meta: {},
};

const getDefaultManagementMeta = (): ManagementMeta => ({
  pagination: {
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
    currentPage: 1,
  },
});

export const SelectManagementMeta = (key: string) =>
  createSelector(
    (state: RootState) => state.management.meta[key],
    (meta) => ({ ...meta })
  );

const managementReducer = createSlice({
  name: "management",
  initialState,
  reducers: {
    setMeta: (
      state,
      action: PayloadAction<{ key: string; meta: Partial<ManagementMeta> }>
    ) => {
      const { key, meta } = action.payload;
      state.meta[key] = {
        ...getDefaultManagementMeta(),
        ...state.meta[key],
        ...meta,
      };
    },
    setPagination: (
      state,
      action: PayloadAction<{ key: string; pagination: Pagination }>
    ) => {
      const { key, pagination } = action.payload;
      state.meta[key] = {
        ...getDefaultManagementMeta(),
        ...state.meta[key],
        pagination,
      };
    },
    resetSingleManagementData: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state[key];
      delete state.meta[key];
    },
    resetAllStates: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, () => {})
      .addCase(createUser.rejected, () => {})
      .addCase(createUser.pending, () => {});
  },
});

export const { setMeta, setPagination, resetSingleManagementData } =
  managementReducer.actions;

export default managementReducer.reducer;
