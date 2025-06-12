import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../Config/Api/AxiosInstance";
import { API_ENDPOINTS } from "../../../../Config/Api/EndPoints";
import { CreateOperatorPayload, UpdateOperatorPayload } from "./types";

export const fetchOperator = createAsyncThunk(
  "operatorMaster/fetchOperator",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS?.MASTER?.OPERATOR}?page=${0}&size=${10}`
      );
      if (response.data) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message || "No Operator found");
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
      if (response.data) {
        return response.data.data;
      } else {
        return rejectWithValue(
          response.data.message || "No data found for this ID - " + id
        );
      }
    } catch (error: any) {
      console.log(error);
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

      if (responseData && responseData.statusCode === 201) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData.message || "Failed to Create Operator"
        );
      }
    } catch (error: any) {
      console.log(error);
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
