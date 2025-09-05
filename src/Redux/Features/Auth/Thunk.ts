import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../Config/Api/AxiosInstance";
import { API_ENDPOINTS } from "../../../Config/Api/EndPoints";
import {
  changePasswordPayload,
  forgetPasswordPayload,
  loginPayload,
  optVerifyPayload,
  resendOtpPayload,
  setPasswordPayload,
} from "./Types";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (payload: loginPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.LOGIN,
        payload // Sending payload as body
      );

      if (response?.data?.statusCode == 200) {
        return response?.data;
      } else {
        // If not 200, treat as failure
        return rejectWithValue(response?.data?.message || "Login failed");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

export const otpVerify = createAsyncThunk(
  "auth/otpVerify",
  async (payload: optVerifyPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.VERIFY_OTP,
        payload // No body, since we are sending query params
        // {
        //   params: payload,
        // }
      );
      if (response?.data?.statusCode == 200) {
        return response?.data;
      } else {
        return rejectWithValue(
          response?.data?.message || "OTP verification failed"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "OTP verification failed"
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (payload: resendOtpPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.RESEND_OTP,
        payload // No body, since we are sending query params
        // {
        //   params: payload,
        // }
      );
      if (response.data.statusCode == 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message || "OTP Resend failed");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "OTP Resend failed"
      );
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (payload: forgetPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.FORGET_PASSWORD,
        payload // No body, since we are sending query params
        // {
        //   params: payload,
        // }
      );
      if (response.data.statusCode == 200) {
        return response.data;
      } else {
        return rejectWithValue(
          response.data.message || "forget Password failed"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "forget Password failed"
      );
    }
  }
);

export const setPassword = createAsyncThunk(
  "auth/setPassword",
  async (payload: setPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.SET_PASSWORD,
        payload // No body, since we are sending query params
        // {
        //   params: payload,
        // }
      );
      if (response.data.statusCode == 200) {
        return response.data;
      } else {
        return rejectWithValue(
          response.data.message || "Failed to Set Password"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to Set Password"
      );
    }
  }
);

export const fetchWalletBalance = createAsyncThunk(
  "auth/fetchWalletBalance",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.AUTH.WALLET_BALANCE}/${id}`
      );
      if (response.data.statusCode == 200 || response.data.statusCode == 201) {
        return response.data;
      } else {
        return rejectWithValue(
          response.data.message || "Failed to Fetch Wallet Balance"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error Fetching Wallet Balance"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload: changePasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${API_ENDPOINTS.AUTH.CHANGE_PASSWORD}`,
        // "https://uat.decipay.in/enterprises/auth/change-password-admin",
        payload
      );
      if (response.data.statusCode == 200) {
        return response.data;
      } else {
        return rejectWithValue(
          response.data.message || "Failed to Change Password"
        );
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error While Change Password"
      );
    }
  }
);
