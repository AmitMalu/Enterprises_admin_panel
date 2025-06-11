import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../Config/Api/AxiosInstance";
import { API_ENDPOINTS } from "../../../../Config/Api/EndPoints";
import { CreateSubProductPayload, UpdateSubProductPayload } from "./types";

export const fetchSubProduct = createAsyncThunk(
  "subProductMaster/fetchSubProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS?.MASTER?.SUB_PRODUCT
      );
      if (response?.data) {
        return response?.data.data;
      } else {
        return rejectWithValue(
          response.data.message || "No Sub Products found"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "No Sub Products found"
      );
    }
  }
);

export const fetchSubProductById = createAsyncThunk(
  "subProductMaster/fetchSubProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.MASTER.SUB_PRODUCT}/${id}` // endpoint requires the ID,
      );
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(
          response.data.message || "No data found for this ID - " + id
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

export const createSubProduct = createAsyncThunk(
  "subProductMaster/createSubProduct",
  async (data: CreateSubProductPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.MASTER.SUB_PRODUCT,
        data
      );
      const responseData = response?.data;

      if (responseData && responseData.statusCode === 201) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData.message || "Failed to Create Sub product"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create Sub product"
      );
    }
  }
);

export const updateSubProduct = createAsyncThunk(
  "subProductMaster/updateSubProduct",
  async (
    { id, data }: { id: string; data: UpdateSubProductPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.MASTER.SUB_PRODUCT}/${id}`,
        data
      );

      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData.message || "Failed to update Subproduct"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update Subproduct"
      );
    }
  }
);

export const fetchDropDownForSubProducts = createAsyncThunk(
  "subProductMaster/fetchDropDownForSubProducts",
  async (id : string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS?.MASTER?.SUB_PRODUCT}/dropdown/${id}`
      );
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message || "No list found");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "No list found"
      );
    }
  }
);
