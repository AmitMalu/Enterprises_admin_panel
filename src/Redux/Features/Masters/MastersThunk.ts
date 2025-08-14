import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPagination } from "./MastersSlice";
import { axiosInstance } from "../../../Config/Api/AxiosInstance";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../../Config/Api/EndPoints";

type FetchMasterListParams = {
  key: string;
  url: string;
  page?: number;
  size?: number;
  filter?: Record<string, any> | null;
  method?: "GET" | "POST";
  payload?: any;
};

interface CreateMasterParams<T> {
  key: string;
  url: string;
  data: T;
  useFormData?: boolean;
}

interface UpdateMasterParams<T> {
  key: string;
  url: string;
  id?: string;
  data?: T;
  useFormData?: boolean;
  mode?: "POST" | "PUT";
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
    {
      key,
      url,
      page = 1,
      size = 10,
      filter = null,
      method = "GET",
      payload = null,
    }: FetchMasterListParams,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("page", String(page - 1)); // 0 - based
      params.append("size", String(size));
      // Append all filters as query params
      if (filter && typeof filter === "object") {
        Object.entries(filter).forEach(([k, v]) => {
          if (v !== undefined && v !== null) {
            params.append(k, String(v));
          }
        });
      }

      // ✅ Smart joiner: add `?` or `&` depending on presence of `?` in URL
      const connector = url.includes("?") ? "&" : "?";
      const finalUrl = `${url}${connector}${params.toString()}`;

      let response;
      if (method === "POST" && payload) {
        response = await axiosInstance.post(finalUrl, payload || {});
      } else if (method === "POST" && !payload) {
        response = await axiosInstance.post(finalUrl);
      } else {
        response = await axiosInstance.get(finalUrl);
      }

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

        // ✅ Show toast if content is empty
        if (!content || content.length === 0) {
          toast.warning("No records found", {
            autoClose: 1000,
            className: "!text-sm",
            position: "bottom-right",
          });
        }

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

// export const createMasterItem = createAsyncThunk(
//   "masters/createMasterItem",
//   async ({ key, url, data }: CreateMasterParams<any>, { rejectWithValue }) => {
//     // dispatch(setLoading({ key, loading: true }));
//     // dispatch(setError({ key, error: null }));
//     // dispatch(setLoaded({ key, loaded: false }));

//     try {
//       const response = await axiosInstance.post(url, data);
//       const responseData = response?.data;

//       if (
//         responseData?.statusCode === 201 ||
//         responseData?.statusCode === 200
//       ) {
//         // dispatch(setLoading({ key, loading: false }));
//         // dispatch(setLoaded({ key, loaded: false }));
//         return responseData;
//       } else {
//         throw new Error(
//           responseData?.message || `Failed to create ${key} Master`
//         );
//       }
//     } catch (error: any) {
//       const errMsg =
//         error?.response?.data?.message ||
//         error.message ||
//         `Failed to create ${key} Master`;
//       // dispatch(setLoading({ key, loading: false }));
//       // dispatch(setError({ key, error: errMsg }));
//       return rejectWithValue(errMsg);
//     }
//   }
// );

export const createMasterItem = createAsyncThunk(
  "masters/createMasterItem",
  async (
    { key, url, data, useFormData = false }: CreateMasterParams<any>,
    { rejectWithValue }
  ) => {
    // dispatch(setLoading({ key, loading: true }));
    // dispatch(setError({ key, error: null }));
    // dispatch(setLoaded({ key, loaded: false }));

    try {
      const response = await axiosInstance.post(url, data, {
        headers: useFormData
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
      });
      const responseData = response?.data;

      if ([200, 201].includes(responseData?.statusCode)) {
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
      return rejectWithValue(errMsg);
    }
  }
);

// export const updateMasterItem = createAsyncThunk(
//   "masters/updateMasterItem",
//   async (
//     { key, url, id, data, mode = "PUT" }: UpdateMasterParams<any>,
//     { rejectWithValue }
//   ) => {
//     try {
//       const endpoint = id ? `${url}/${id}` : url;
//       let response;

//       if (mode === "POST") {
//         response = await axiosInstance.post(endpoint, data ?? data);
//       } else {
//         response = await axiosInstance.put(endpoint, data ?? data); //default to put
//       }
//       const responseData = response?.data;

//       if (responseData?.statusCode === 200) {
//         return responseData;
//       } else {
//         throw new Error(
//           responseData?.message || `Failed to create ${key} Master`
//         );
//       }
//     } catch (error: any) {
//       const errMsg =
//         error?.response?.data?.message ||
//         error.message ||
//         `Failed to create ${key} Master`;
//       return rejectWithValue(errMsg);
//     }
//   }
// );

export const updateMasterItem = createAsyncThunk(
  "masters/updateMasterItem",
  async (
    {
      key,
      url,
      id,
      data,
      mode = "PUT",
      useFormData = false,
    }: UpdateMasterParams<any>,
    { rejectWithValue }
  ) => {
    try {
      const endpoint = id ? `${url}/${id}` : url;
      const method = mode === "POST" ? "post" : "put";
      const response = await axiosInstance[method](endpoint, data, {
        headers: useFormData
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
      });

      const responseData = response?.data;

      if (responseData?.statusCode === 200) {
        return responseData;
      } else {
        throw new Error(
          responseData?.message || `Failed to Update ${key} Master`
        );
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        error.message ||
        `Error Updating ${key} Master`;
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

export const fetchReport = createAsyncThunk(
  "masters/fetchReport",
  async (
    { url, key, data }: { url: string; key: any; data: any },
    { rejectWithValue, dispatch }
  ) => {
    try {
      let response = await axiosInstance.post(url, data);

      const responseData = response?.data;

      if (responseData?.statusCode === 200) {
        const {
          content,
          totalPages,
          totalElements,
          size,
          pageSize,
          pageNumber,
          number,
        } = responseData.data;

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
        return content;
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

export const AdhaarValidationApi = createAsyncThunk(
  "masters/Adhaarvalidation",
  async ({ aadhaarNumber }: { aadhaarNumber: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${API_ENDPOINTS.MANAGEMENT.ADHAAR_VERIFY}?aadhaarNumber=${aadhaarNumber}`
      );

      const responseData = response?.data;

      if (responseData?.statusCode === 200) {
        return responseData.data;
      } else {
        throw new Error(responseData?.message || "Failed to Verify Aadhaar");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error in Aadhaar verification"
      );
    }
  }
);

export const PanValidationApi = createAsyncThunk(
  "masters/PanValidationApi",
  async ({ panNumber }: { panNumber: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${API_ENDPOINTS.MANAGEMENT.PAN_VERIFY}?panNumber=${panNumber}`
      );

      const responseData = response?.data;

      if (responseData?.statusCode === 200) {
        return responseData.data;
      } else {
        throw new Error(
          responseData?.message || "Failed to Verify Pancard Number"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error in Pancard Number verification"
      );
    }
  }
);

export const AdhaarPanLinkApi = createAsyncThunk(
  "masters/AdhaarPanLinkApi",
  async ({ aadhaarNumber }: { aadhaarNumber: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${API_ENDPOINTS.MANAGEMENT.AADHAAR_PAN_LINK}?aadhaarNumber=${aadhaarNumber}`
      );

      const responseData = response?.data;

      if (responseData?.statusCode === 200) {
        return responseData.data;
      } else {
        throw new Error(
          responseData?.message || "Failed to Verify Aadhaar Pan Link"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error in Aadhaar Pan Link verification"
      );
    }
  }
);
