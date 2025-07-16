import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPagination } from "./MastersSlice";
import { axiosInstance } from "../../../Config/Api/AxiosInstance";

type FetchMasterListParams = {
  key: string;
  url: string;
  page?: number;
  size?: number;
  filter?: { key: string; value: any } | null;
};

interface CreateMasterParams<T> {
  key: string;
  url: string;
  data: T;
}

interface UpdateMasterParams<T> {
  key: string;
  url: string;
  id?: string;
  data?: T;
}

export interface FetchMasterByIdParams {
  key: string;
  endpoint: string;
  id: string;
}

// APIs
export const fetchMasterList = createAsyncThunk(
  "masters/fetchMasterList",
  async (
    { key, url, page = 1, size = 10, filter }: FetchMasterListParams,
    { rejectWithValue, dispatch }
  ) => {
    // dispatch(setLoading({ key, loading: true }));
    // dispatch(setLoaded({ key, loaded: false }));
    // dispatch(setError({ key, error: null }));
    try {
      const params = new URLSearchParams();
      params.append("page", String(page - 1)); // 0 - based
      params.append("size", String(size));
      if (filter?.key) {
        params.append(filter.key, String(filter.value ?? ""));
      }

      const response = await axiosInstance.get(`${url}?${params.toString()}`);
      const responseData = response?.data;

      if (responseData.statusCode === 200) {
        const {
          content,
          totalPages,
          totalElements,
          size,
          pageSize,
          pageNumber,
          number,
        } = responseData.data;

        // Set data and meta in store
        // dispatch(setData({ key, value: content }));
        dispatch(
          setPagination({
            key,
            pagination: {
              totalPages,
              totalElements,
              pageSize: size ?? pageSize,
              currentPage: number + 1 || pageNumber + 1,
            },
          })
        );
        // dispatch(setLoaded({ key, loaded: true }));
        // dispatch(setLoading({ key, loading: false }));
        return content;
      } else {
        throw new Error(responseData?.message || "Fetch failed");
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message || error.message || "Failed to fetch";
      // dispatch(setError({ key, error: errMsg }));
      // dispatch(setLoading({ key, loading: false }));
      // dispatch(setLoaded({ key, loaded: false }));

      return rejectWithValue(errMsg);
    }
  }
);

export const fetchMasterById = createAsyncThunk(
  "masters/fetchMasterById",
  async ({ key, endpoint, id }: FetchMasterByIdParams, { rejectWithValue }) => {
    // dispatch(setLoading({ key, loading: true }));
    try {
      const response = await axiosInstance.get(`${endpoint}/${id}`);
      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        // dispatch(setData({ key: `${key}Selected`, value: responseData.data }));
        // dispatch(setError({ key, error: null }));
        return responseData.data;
      } else {
        const message =
          responseData?.message || `No ${key} found for ID: ${id}`;
        // dispatch(setError({ key, error: message }));
        return rejectWithValue(message);
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        `Failed to fetch ${key} by ID`;
      // dispatch(setError({ key, error: message }));
      return rejectWithValue(message);
    }
  }
);

export const createMasterItem = createAsyncThunk(
  "masters/createMasterItem",
  async ({ key, url, data }: CreateMasterParams<any>, { rejectWithValue }) => {
    // dispatch(setLoading({ key, loading: true }));
    // dispatch(setError({ key, error: null }));
    // dispatch(setLoaded({ key, loaded: false }));

    try {
      const response = await axiosInstance.post(url, data);
      const responseData = response?.data;

      if (
        responseData?.statusCode === 201 ||
        responseData?.statusCode === 200
      ) {
        // dispatch(setLoading({ key, loading: false }));
        // dispatch(setLoaded({ key, loaded: false }));
        return responseData;
      } else {
        throw new Error(
          responseData?.message || `Failed to create ${key} Master`
        );
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        error.message ||
        `Failed to create ${key} Master`;
      // dispatch(setLoading({ key, loading: false }));
      // dispatch(setError({ key, error: errMsg }));
      return rejectWithValue(errMsg);
    }
  }
);

export const updateMasterItem = createAsyncThunk(
  "masters/updateMasterItem",
  async (
    { key, url, id, data }: UpdateMasterParams<any>,
    { rejectWithValue }
  ) => {
    // dispatch(setLoading({ key, loading: true }));
    // dispatch(setError({ key, error: null }));
    // dispatch(setLoaded({ key, loaded: false }));

    try {
      const endpoint = id ? `${url}/${id}` : url;
      const response = await axiosInstance.put(endpoint, data ?? data);
      const responseData = response?.data;

      if (responseData?.statusCode === 200) {
        // dispatch(setLoading({ key, loading: false }));
        // dispatch(setLoaded({ key, loaded: false }));
        return responseData;
      } else {
        throw new Error(
          responseData?.message || `Failed to create ${key} Master`
        );
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        error.message ||
        `Failed to create ${key} Master`;
      // dispatch(setLoading({ key, loading: false }));
      // dispatch(setError({ key, error: errMsg }));
      return rejectWithValue(errMsg);
    }
  }
);

export const fetchMasterDropdown = createAsyncThunk(
  "masters/fetchDropdown",
  async (
    {
      url,
      method = "GET",
    }: { url: string; method?: "GET" | "POST" | "PUT" | "DELETE" },
    { rejectWithValue }
  ) => {
    try {
      let response;
      if (method === "POST") {
        response = await axiosInstance.post(url);
      } else {
        response = await axiosInstance.get(url); // Default to GET
      }

      const responseData = response?.data;

      if (responseData?.statusCode === 200) {
        return responseData.data;
      } else {
        throw new Error(responseData?.message || "Failed to fetch data");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "No list found"
      );
    }
  }
);
