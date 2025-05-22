import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../Config/Api/AxiosInstance";
import { API_ENDPOINTS } from "../../../Config/Api/EndPoints";
import { CreateUserPayload } from "./Types";

export const createUser = createAsyncThunk(
  "management/create",
  async ({ userType, data }: CreateUserPayload, { rejectWithValue }) => {
    
    try {
      const endPoint = API_ENDPOINTS?.MANAGEMENT.USER_CREATE[userType];

      if (!endPoint) {
        return rejectWithValue(
          `No endpoint configured for userType: ${userType}`
        );
      }

      const response = await axiosInstance.post(endPoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.statusCode == 200) {
        return response.data;
      } else {
        // If not 200, treat as failure
        return rejectWithValue(response.data.message || "Login failed");
      }
    } catch (error: any) {
      console.error(error, "error");
      
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);
