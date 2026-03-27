import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../Config/Api/AxiosInstance";
import { API_ENDPOINTS } from "../../../Config/Api/EndPoints";
import { CreateUserPayload, UpdateUserPayload } from "./Types";

export const createUser = createAsyncThunk(
  "management/create",
  async ({ userType, data }: CreateUserPayload, { rejectWithValue }) => {
    try {
      const endPoint = API_ENDPOINTS?.MANAGEMENT.USER_CREATE[userType];

      if (!endPoint) {
        return rejectWithValue(
          `No endpoint configured for userType: ${userType}`,
        );
      }

      const response = await axiosInstance.post(endPoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.statusCode == 200 || response.data.statusCode == 201) {
        return response.data;
      } else {
        // If not 200, treat as failure
        return rejectWithValue(
          response.data.message || "Failed to Create User",
        );
      }
    } catch (error: any) {
      console.error(error, "error");

      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data?.messages?.[0] ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to Create User";

      return rejectWithValue(serverMessage || "Failed to Create User");
    }
  },
);

export const updateUser = createAsyncThunk(
  "management/update",
  async ({ userType, payload, id }: UpdateUserPayload, { rejectWithValue }) => {
    try {
      const endPoint = `${API_ENDPOINTS?.MANAGEMENT.USER_CREATE[userType]}/${id}`;

      if (!endPoint) {
        return rejectWithValue(
          `No endpoint configured for userType: ${userType}`,
        );
      }

      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(payload)], { type: "application/json" }),
      );

      const response = await axiosInstance.put(endPoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.statusCode == 200 || response.data.statusCode == 201) {
        return response.data;
      } else {
        // If not 200, treat as failure
        return rejectWithValue(
          response.data.message || "Failed to Update User",
        );
      }
    } catch (error: any) {
      console.error(error, "error");

      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data?.messages?.[0] ||
        error?.response?.data?.error ||
        error?.message ||
        "Error while Updating User";

      return rejectWithValue(serverMessage);
    }
  },
);
