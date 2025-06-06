import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../Config/Api/AxiosInstance";
import { API_ENDPOINTS } from "../../../../Config/Api/EndPoints";
import { ProductStateType } from "./types";

export const fetchProduct = createAsyncThunk(
  "productMaster/fetchProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.MASTER.PRODUCT_LIST
      );
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message || "No data found");
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "No data found"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "productMaster/fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.MASTER.PRODUCT_LIST}/${id}` // endpoint requires the ID,
      );
      if (response.data) {
        return response.data;
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

export const createProduct = createAsyncThunk(
  "productMaster/createProduct",
  async (data: ProductStateType, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.MASTER.PRODUCT_LIST,
        data
      );
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(
          response.data.message || "Failed to create product"
        );
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create product"
      );
    }
  }
);
