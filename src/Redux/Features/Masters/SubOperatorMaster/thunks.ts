import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../Config/Api/AxiosInstance";
import { API_ENDPOINTS } from "../../../../Config/Api/EndPoints";
import { CreateSubOperatorPayload, UpdateSubOperatorPayload } from "./types";
import { FetchSubProductParams } from "../SubProductMaster/types";

export const fetchSubOperator = createAsyncThunk(
  "subOperatorMaster/fetchSubOperator",
  async (
    { page = 0, size = 10, filter }: FetchSubProductParams,
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("page", String(page - 1));
      params.append("size", String(size));
      if (filter?.key) {
        params.append(String(filter.key), String(filter.value ?? ""));
      }
      const response = await axiosInstance.get(
        `${API_ENDPOINTS?.MASTER?.SUB_OPERATOR}?${params.toString()}`
      );
      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData?.message || "No Sub-Operator found"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "No Sub-Operator found"
      );
    }
  }
);

export const fetchSubOperatorById = createAsyncThunk(
  "subOperatorMaster/fetchSubOperatorById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.MASTER.SUB_OPERATOR}/${id}` // endpoint requires the ID,
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

export const createSubOperator = createAsyncThunk(
  "subOperatorMaster/createSubOperator",
  async (data: CreateSubOperatorPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.MASTER.SUB_OPERATOR,
        data
      );
      const responseData = response?.data;

      if (responseData && responseData?.statusCode === 201) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData?.message || "Failed to Create Sub-Operator"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create Sub-Operator"
      );
    }
  }
);

export const updateSubOperator = createAsyncThunk(
  "subOperatorMaster/updateSubOperator",
  async (
    { id, data }: { id: string; data: UpdateSubOperatorPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.MASTER.SUB_OPERATOR}/${id}`,
        data
      );

      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData.message || "Failed to Update Sub-Operator"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update Sub-Operator"
      );
    }
  }
);

export const fetchSubOperatorByOperatorCode = createAsyncThunk(
  "subProductMaster/fetchSubOperatorByOperatorCode",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.MASTER.SUB_OPERATOR}/${code}` // endpoint requires the ID,
      );
      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData?.message || "No data found for this Code - " + code
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          `No data found for this Code - ${code}`
      );
    }
  }
);
