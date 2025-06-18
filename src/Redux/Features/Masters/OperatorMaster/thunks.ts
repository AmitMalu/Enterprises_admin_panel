import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../Config/Api/AxiosInstance";
import { API_ENDPOINTS } from "../../../../Config/Api/EndPoints";
import {
  CreateOperatorPayload,
  FetchOperatorParams,
  UpdateOperatorPayload,
} from "./types";

export const fetchOperator = createAsyncThunk(
  "operatorMaster/fetchOperator",
  async (
    { page = 0, size = 10, filter }: FetchOperatorParams,
    { rejectWithValue }
  ) => {
    const params = new URLSearchParams();
    params.append("page", String(page - 1));
    params.append("size", String(size));
    if (filter?.key) {
      params.append(String(filter.key), String(filter.value ?? ""));
    }
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS?.MASTER?.OPERATOR}?${params.toString()}`
      );
      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData;
      } else {
        return rejectWithValue(responseData?.message || "No Operator found");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "No Operator found"
      );
    }
  }
);

export const fetchOperatorById = createAsyncThunk(
  "operatorMaster/fetchOperatorById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.MASTER.OPERATOR}/${id}` // endpoint requires the ID,
      );
      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData?.message || "No data found for this ID - " + id
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          `No data found for this ID - ${id}`
      );
    }
  }
);

export const createOperator = createAsyncThunk(
  "operatorMaster/createOperator",
  async (data: CreateOperatorPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.MASTER.OPERATOR,
        data
      );
      const responseData = response?.data;

      if (responseData && responseData?.statusCode === 201) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData?.message || "Failed to Create Operator"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create Operator"
      );
    }
  }
);

export const updateOperator = createAsyncThunk(
  "operatorMaster/updateOperator",
  async (
    { id, data }: { id: string; data: UpdateOperatorPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.MASTER.OPERATOR}/${id}`,
        data
      );

      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData.message || "Failed to Update Operator"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update Operator"
      );
    }
  }
);

export const fetchDropDownForOperators = createAsyncThunk(
  "productMaster/fetchDropDownForOperators",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS?.MASTER?.OPERATOR}/active`
      );
      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData.data;
      } else {
        return rejectWithValue(responseData?.message || "No list found");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "No list found"
      );
    }
  }
);
