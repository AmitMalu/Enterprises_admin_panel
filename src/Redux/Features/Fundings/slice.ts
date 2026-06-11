import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store/store";

type Pagination = {
  totalPages: number;
  totalElements: number;
  pageSize: number;
  currentPage: number;
};

type FundingMeta = {
  pagination: Pagination;
};

export type FundingState = {
  meta: Record<string, FundingMeta>;
  [key: string]: any;
};

const initialState: FundingState = {
  meta: {},
};

const getDefaultFundingMeta = (): FundingMeta => ({
  pagination: {
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
    currentPage: 1,
  },
});

export const SelectFundingMeta = (key: string) =>
  createSelector(
    (state: RootState) => state.funding.meta[key],
    (meta) => ({ ...meta })
  );

const fundingSlice = createSlice({
  name: "fundings",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setMeta: (
      state,
      action: PayloadAction<{ key: string; meta: Partial<FundingMeta> }>
    ) => {
      const { key, meta } = action.payload;
      state.meta[key] = {
        ...getDefaultFundingMeta(),
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
        ...getDefaultFundingMeta(),
        ...state.meta[key],
        pagination,
      };
    },
    resetSingleFundingData: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state[key];
      delete state.meta[key];
    },
    resetAllStates: () => initialState,
  },
});

export const { setData, setMeta, setPagination, resetSingleFundingData } =
  fundingSlice.actions;

export default fundingSlice.reducer;
