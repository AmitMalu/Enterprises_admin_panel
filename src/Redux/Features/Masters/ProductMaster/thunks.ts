import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../Config/Api/AxiosInstance";
import { API_ENDPOINTS } from "../../../../Config/Api/EndPoints";
import { ProductStateType } from "./types";

export const fetchProduct = createAsyncThunk(
  "productMaster/fetchProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS?.MASTER?.PRODUCTS);
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

export const fetchDropDownForProducts = createAsyncThunk(
  "productMaster/fetchDropDownForProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS?.MASTER?.PRODUCTS}/dropdown/active`);
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

export const fetchProductById = createAsyncThunk(
  "productMaster/fetchProductById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.MASTER.PRODUCTS}/${id}` // endpoint requires the ID,
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
        API_ENDPOINTS.MASTER.PRODUCTS,
        data
      );
      const responseData = response?.data;

      if (responseData && responseData.statusCode === 201) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData.message || "Failed to Create product"
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

export const updateProduct = createAsyncThunk(
  "productMaster/updateProduct",
  async (
    { id, data }: { id: string; data: ProductStateType },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.MASTER.PRODUCTS}/${id}`,
        data
      );

      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData.message || "Failed to update product"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update product"
      );
    }
  }
);
