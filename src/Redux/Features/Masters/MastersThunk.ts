import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPagination } from "./MastersSlice";
import { axiosInstance } from "../../../Config/Api/AxiosInstance";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../../Config/Api/EndPoints";
import { NetworkBankMasterFormType } from "../../../Config/Master/NetworkBankMasterConfig";

type FetchMasterListParams = {
  key: string;
  url: string;
  page?: number;
  size?: number;
  filter?: Record<string, any> | null;
  method?: "GET" | "POST";
  payload?: any;
  skipPagination?: Boolean;
  returnFullData?: Boolean;
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
  method?: "GET" | "POST";
}

// Define the input type for reusability
interface DownloadFileParams {
  url: string;
  filename: string; // default name for download
  method?: "GET" | "POST"; // optional, defaults to GET
  body?: any; // for POST APIs
}
interface DeleteParams {
  url: string;
  params?: Record<string, any>; // query params
  payload?: any; // request body for delete
  successMessage?: string;
  failureMessage?: string;
  useFormData?: boolean;
}

const documentApiMap: Record<
  string,
  { url: string; method: "get" | "post"; type: "params" | "data"; key: string }
> = {
  AADHAAR_FRONT: {
    url: API_ENDPOINTS.MANAGEMENT.ADHAAR_VERIFY,
    method: "post",
    type: "params",
    key: "aadhaarNumber",
  },
  AADHAAR_BACK: {
    url: API_ENDPOINTS.MANAGEMENT.ADHAAR_VERIFY,
    method: "post",
    type: "params",
    key: "aadhaarNumber",
  },
  PAN: {
    url: API_ENDPOINTS.MANAGEMENT.PAN_VERIFY,
    method: "post",
    type: "params",
    key: "panNumber",
  },
  AADHAAR_PAN_VERIFIED: {
    url: API_ENDPOINTS.MANAGEMENT.AADHAAR_PAN_LINK,
    method: "post",
    type: "params",
    key: "aadhaarNumber",
  },
  // EMAIL: {
  //   url: API_ENDPOINTS.MANAGEMENT.EMAIL_VERIFY,
  //   method: "post",
  //   type: "data",
  //   key: "email",
  // },
  VOTER_ID: {
    url: API_ENDPOINTS.MANAGEMENT.VOTERID_VERIFY,
    method: "post",
    type: "params",
    key: "voterId",
  },
};

// Here Filter and pagination will be passed as Params and Payload in body.
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
      skipPagination = false,
      returnFullData = false,
    }: FetchMasterListParams,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const params = new URLSearchParams();

      // Append page & size only if skipPagination is false
      if (!skipPagination) {
        params.append("page", String(page - 1)); // 0 - based
        params.append("size", String(size));
      }

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

      if ([200, 201].includes(responseData.statusCode)) {
        if (returnFullData) {
          // Return the full data object
          return responseData.data;
        }

        const {
          content = [],
          totalPages = 0,
          totalElements = 0,
          size,
          pageSize,
          pageNumber,
          number,
        } = responseData.data || {};

        // Set data and meta in store
        if (!skipPagination) {
          dispatch(
            setPagination({
              key,
              pagination: {
                totalPages: totalPages || 0,
                totalElements: totalElements || 0,
                pageSize: size ?? pageSize ?? 10,
                currentPage: (number ?? pageNumber ?? 0) + 1,
              },
            })
          );
        }

        // Show toast if content is empty
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

// All Request Data will be passed in body - pagination and data everything
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

export const fetchMasterById = createAsyncThunk(
  "masters/fetchMasterById",
  async (
    { key, endpoint, id, method = "GET" }: FetchMasterByIdParams,
    { rejectWithValue }
  ) => {
    // dispatch(setLoading({ key, loading: true }));
    try {
      let response;
      if (method === "POST") {
        response = await axiosInstance.post(`${endpoint}/${id}`);
      } else {
        response = await axiosInstance.get(`${endpoint}/${id}`);
      }
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
  async (
    { key, url, data, useFormData = false }: CreateMasterParams<any>,
    { rejectWithValue }
  ) => {

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

export const deleteMasterItem = createAsyncThunk(
  "masters/deleteMasterItem",
  async (deleteParams: DeleteParams, { rejectWithValue }) => {
    const {
      url,
      params,
      payload,
      successMessage,
      failureMessage,
      useFormData = false,
    } = deleteParams;

    try {
      // Build query string if params exist
      let finalUrl = url;
      if (params && Object.keys(params).length > 0) {
        const query = new URLSearchParams(
          Object.entries(params).map(([k, v]) => [k, String(v)])
        ).toString();
        finalUrl += url.includes("?") ? `&${query}` : `?${query}`;
      }

      // Send DELETE request
      const response = await axiosInstance.delete(finalUrl, {
        data: payload,
        headers: useFormData
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
      });

      const responseData = response?.data;

      if ([200, 201].includes(responseData?.statusCode)) {
        if (successMessage) {
          toast.success(successMessage);
        }
        return responseData;
      } else {
        throw new Error(responseData?.message || failureMessage);
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message || error.message || failureMessage;
      if (errMsg) {
        toast.error(errMsg);
      }
      return rejectWithValue(errMsg);
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

export const DocumentValidationApi = createAsyncThunk(
  "masters/DocumentValidationApi",
  async (
    {
      documentType,
      value, // this is the value user entered or selected for verification
    }: {
      documentType: string;
      value: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const configData = documentApiMap[documentType];
      if (!configData) {
        throw new Error("Invalid document type");
      }

      const { url, method, type, key } = configData;

      // Prepare payload based on type
      let payload: any = {};
      if (type === "params") {
        payload = { [key]: value };
      } else if (type === "data") {
        payload = { [key]: value };
      }

      const response = await axiosInstance.request({
        url,
        method,
        ...(type === "params" ? { params: payload } : { data: payload }),
      });

      const responseData = response?.data;

      if (responseData?.statusCode === 200) {
        return responseData.data;
      } else {
        throw new Error(responseData?.message || "Verification failed");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Error in verification"
      );
    }
  }
);

export const handleKycDocumentUpdate = createAsyncThunk(
  "masters/handleKycDocumentUpdate",
  async (
    {
      hierarchyId,
      category,
      verified,
      docNumber,
      imageFile,
    }: {
      hierarchyId: string;
      category: string;
      verified: boolean;
      docNumber?: string | number;
      imageFile?: File | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      const requestObject = {
        hierarchyId,
        category,
        verified,
        docNumber,
      };

      formData.append("request", JSON.stringify(requestObject));

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const response = await axiosInstance.post(
        `${API_ENDPOINTS.MANAGEMENT.KYC}/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const responseData = response?.data;

      if (responseData?.statusCode === 200) {
        return responseData.data;
      } else {
        throw new Error(responseData?.message || "Update failed");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Error updating KYC"
      );
    }
  }
);

export const downloadFileThunk = createAsyncThunk(
  "common/downloadFile",
  async (
    {
      url,
      filename = "Sample-file.xlsx",
      method = "GET",
      body,
    }: DownloadFileParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.request({
        url,
        method,
        data: body,
        responseType: "blob", // Important: tells axios to treat it as a file
      });

      // 🔹 Create a Blob object from the binary response data
      const blob = new Blob([response.data]);
      // 🔹 Create a temporary invisible link in DOM
      const link = document.createElement("a");
      // 🔹 Attach blob data to the link as a downloadable URL
      link.href = window.URL.createObjectURL(blob);
      // 🔹 Set filename for downloaded file
      link.download = filename;
      // 🔹 Trigger the download (simulate a click)
      link.click();
      // 🔹 Remove the temporary link from DOM
      link.remove();

      return { success: true, filename };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "File download failed");
    }
  }
);

const isFile = (file: any): file is File => file instanceof File;

// Thunk to create a Network Bank
export const createNetworkBank = createAsyncThunk(
  "networkBank/create",
  async (formData: NetworkBankMasterFormType, { rejectWithValue }) => {
    try {
      const payload = new FormData();
      const { logo, ...bankData } = formData;

      (bankData as any).createdBy =
        localStorage.getItem("username") || "system";

      payload.append("bankData", JSON.stringify(bankData));

      if (isFile(logo)) {
        payload.append("logo", logo, logo.name);
      }

      const response = await axiosInstance.post(
        API_ENDPOINTS.MASTER.NETWORK_BANK_MASTER,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if ([200, 201].includes(response.data.statusCode)) {
        return response.data;
      } else {
        throw new Error(
          response.data?.message || "Failed to create Network Bank"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
        error.message ||
        "Failed to create Network Bank"
      );
    }
  }
);

// Thunk to update a Network Bank
export const updateNetworkBank = createAsyncThunk(
  "networkBank/update",
  async (
    { id, formData }: { id: string; formData: NetworkBankMasterFormType },
    { rejectWithValue }
  ) => {
    try {
      const payload = new FormData();
      const { logo, ...bankData } = formData;

      (bankData as any).editedBy = localStorage.getItem("username") || "system";

      payload.append("bankData", JSON.stringify(bankData));

      if (isFile(logo)) {
        payload.append("logo", logo, logo.name);
      }

      const response = await axiosInstance.put(
        `${API_ENDPOINTS.MASTER.NETWORK_BANK_MASTER}/${id}`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.statusCode === 200) {
        return response.data;
      } else {
        throw new Error(
          response.data?.message || "Failed to update Network Bank"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
        error.message ||
        "Failed to update Network Bank"
      );
    }
  }
);

export const fetchWLDropdown = createAsyncThunk(
  "masters/fetchWLDropdown",
  async (_, { rejectWithValue }) => {
    try {
      let response;
      response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS.EMAIL_CREDENTIALS_WL_DROPDOWN);

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
