import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Pagination = {
  totalPages: number;
  totalElements: number;
  pageSize: number;
  currentPage: number;
};

type MasterMeta = {
  loading: boolean;
  loaded: boolean;
  error: string | null;
  pagination: Pagination;
};

export type MasterState = {
  meta: Record<string, MasterMeta>;
  [key: string]: any;
};

const initialState: MasterState = {
  meta: {},
};

const getDefaultMeta = (): MasterMeta => ({
  loading: false,
  loaded: false,
  error: null,
  pagination: {
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
    currentPage: 1,
  },
});

// --- Slice ---
const masterSlice = createSlice({
  name: "masters",
  initialState,
  reducers: {
    // Set generic data like: state.products, state.operators, etc.
    setData: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },

    // Set meta like loading, pagination, etc.
    setMeta: (
      state,
      action: PayloadAction<{ key: string; meta: Partial<MasterMeta> }>
    ) => {
      const { key, meta } = action.payload;
      state.meta[key] = {
        ...getDefaultMeta(),
        ...state.meta[key],
        ...meta,
      };
    },
    // Set loading status for a specific master
    setLoading: (
      state,
      action: PayloadAction<{ key: string; loading: boolean }>
    ) => {
      const { key, loading } = action.payload;
      state.meta[key] = {
        ...getDefaultMeta(),
        ...state.meta[key],
        loading,
      };
    },

    // Set error for a specific master
    setError: (
      state,
      action: PayloadAction<{ key: string; error: string | null }>
    ) => {
      const { key, error } = action.payload;
      state.meta[key] = {
        ...getDefaultMeta(),
        ...state.meta[key],
        error,
      };
    },

    // Set loaded flag
    setLoaded: (
      state,
      action: PayloadAction<{ key: string; loaded: boolean }>
    ) => {
      const { key, loaded } = action.payload;
      state.meta[key] = {
        ...getDefaultMeta(),
        ...state.meta[key],
        loaded,
      };
    },

    // Set pagination
    setPagination: (
      state,
      action: PayloadAction<{ key: string; pagination: Pagination }>
    ) => {
      const { key, pagination } = action.payload;
      state.meta[key] = {
        ...getDefaultMeta(),
        ...state.meta[key],
        pagination,
      };
    },

    // Reset a specific master state
    resetMaster: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      delete state[key];
      delete state.meta[key];
    },

    // Reset entire state (rare use)
    resetAllMasters: () => initialState,
  },
});

export const {
  setData,
  setMeta,
  setLoading,
  setError,
  setLoaded,
  setPagination,
  resetMaster,
  resetAllMasters,
} = masterSlice.actions;

export default masterSlice.reducer;
