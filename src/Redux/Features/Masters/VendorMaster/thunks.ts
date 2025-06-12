import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../Config/Api/AxiosInstance";
import { API_ENDPOINTS } from "../../../../Config/Api/EndPoints";
import { CreateVendorPayload, UpdateVendorPayload } from "./types";

export const fetchVendor = createAsyncThunk(
  "vendorMaster/fetchVendor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS?.MASTER?.VENDOR}?page=${0}&size=${10}`
      );
      if (response.data) {
        return response.data.data;
      } else {
        return rejectWithValue(response.data.message || "No Vendor found");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "No Vendor found"
      );
    }
  }
);

export const fetchVendorById = createAsyncThunk(
  "vendorMaster/fetchVendorById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.MASTER.VENDOR}/${id}` // endpoint requires the ID,
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

export const createVendor = createAsyncThunk(
  "vendorMaster/createVendor",
  async (data: CreateVendorPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.MASTER.VENDOR,
        data
      );
      const responseData = response?.data;

      if (responseData && responseData.statusCode === 201) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData.message || "Failed to Create Vendor"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create Vendor"
      );
    }
  }
);

export const updateVendor = createAsyncThunk(
  "vendorMaster/updateVendor",
  async (
    { id, data }: { id: string; data: UpdateVendorPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.MASTER.VENDOR}/${id}`,
        data
      );

      const responseData = response?.data;

      if (responseData && responseData.statusCode === 200) {
        return responseData;
      } else {
        return rejectWithValue(
          responseData.message || "Failed to Update Vendor"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update Vendor"
      );
    }
  }
);
