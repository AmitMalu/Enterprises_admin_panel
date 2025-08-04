import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../Config/Api/AxiosInstance";
import { setPagination } from "./slice";

type FetchSchemesListParams = {
  key: string;
  url: string;
  page?: number;
  size?: number;
  filter?: { key: string; value: any } | null;
};

export interface FetchSchemeByIdParams {
  key: string;
  endpoint: string;
  id: string;
}

export const fetchSchemesList = createAsyncThunk(
  "schemes/fetchSchemesList",
  async (
    { key, url, page = 1, size = 10, filter }: FetchSchemesListParams,
    { rejectWithValue, dispatch }
  ) => {
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
        const { content, totalPages, totalElements, size, number } =
          responseData.data;
        dispatch(
          setPagination({
            key,
            pagination: {
              totalPages,
              totalElements,
              pageSize: size,
              currentPage: number + 1,
            },
          })
        );
        return content;
      } else {
        throw new Error(responseData?.message || "Fetch failed");
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message || error.message || "Failed to fetch";
      return rejectWithValue(errMsg);
    }
  }
);

export const fetchSchemeById = createAsyncThunk(
  "schemes/fetchSchemeById",
  async ({ key, endpoint, id }: FetchSchemeByIdParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${endpoint}/${id}`);
      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData.data;
      } else {
        const message =
          responseData?.message || `No ${key} found for ID: ${id}`;
        return rejectWithValue(message);
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        `Failed to fetch ${key} by ID`;
      return rejectWithValue(message);
    }
  }
);

export const fetchSchemeByIdPost = createAsyncThunk(
  "schemes/fetchSchemeByIdPost",
  async ({ key, endpoint, id }: FetchSchemeByIdParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${endpoint}/${id}`);
      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData.data;
      } else {
        const message =
          responseData?.message || `No ${key} found for ID: ${id}`;
        return rejectWithValue(message);
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        `Failed to fetch ${key} by ID`;
      return rejectWithValue(message);
    }
  }
);

// export const submitFundRequest = createAsyncThunk(
//   "fundings/submitFundRequest",
//   async (payload: any, { rejectWithValue }) => {
//     const url = `${API_ENDPOINTS.FUNDING.PREFUNDING}/action`;
//     try {
//       const response = await axiosInstance.post(url, payload);
//       const responseData = response?.data;

//       if (responseData && responseData.statusCode === 200) {
//         return responseData.data;
//       } else {
//         const message =
//           responseData?.message || `Failed to update Fund Request`;
//         return rejectWithValue(message);
//       }
//     } catch (error: any) {
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         `Failed to update Fund Request`;
//       return rejectWithValue(message);
//     }
//   }
// );
