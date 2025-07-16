import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/store";

type Pagination = {
  totalPages: number;
  totalElements: number;
  pageSize: number;
  currentPage: number;
};

type SchemesMeta = {
  pagination: Pagination;
};

export type SchemesState = {
  meta: Record<string, SchemesMeta>;
  [key: string]: any;
};

const initialState: SchemesState = {
  meta: {},
};

const getDefaultSchemesMeta = (): SchemesMeta => ({
  pagination: {
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
    currentPage: 1,
  },
});

export const SelectSchemesMeta = (key: string) =>
  createSelector(
    (state: RootState) => state.schemes.meta[key],
    (meta) => ({ ...meta })
  );

const schemesSlice = createSlice({
  name: "schemes",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setMeta: (
      state,
      action: PayloadAction<{ key: string; meta: Partial<SchemesMeta> }>
    ) => {
      const { key, meta } = action.payload;
      state.meta[key] = {
        ...getDefaultSchemesMeta(),
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
        ...getDefaultSchemesMeta(),
        ...state.meta[key],
        pagination,
      };
    },
    resetSingleSchemesData: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state[key];
      delete state.meta[key];
    },
    resetAllStates: () => initialState,
  },
});

export const { setData, setMeta, setPagination, resetSingleSchemesData } =
  schemesSlice.actions;

export default schemesSlice.reducer;
