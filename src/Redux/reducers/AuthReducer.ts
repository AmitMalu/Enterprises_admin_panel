import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Config/Api/AxiosInstance";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";

interface AuthState {
  loading: boolean;
  user: any;
  error: string | null;
  token: string | null;
}

interface loginPayload {
  username: string | number;
  password: string;
  [key: string]: any;
}

interface optVerifyPayload {
  username: string | number;
  otp: string | number;
  [key: string]: any;
}

interface resendOtpPayload {
  username: string | number;
  [key: string]: any;
}

interface forgetPasswordPayload {
  username: string | number;
  [key: string]: any;
}

interface setPasswordPayload {
  username: string | number;
  newPassword: string;
  reEnteredPassword: string;
  [key: string]: any;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  token: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (payload: loginPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.LOGIN,
        null, // No body, since we are sending query params
        {
          params: payload,
          timeout: 10000, // 10 seconds timeout
        }
      );

      if (response.data.statusCode == 200) {
        return response.data;
      } else {
        // If not 200, treat as failure
        return rejectWithValue(response.data.message || "Login failed");
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
        null, // No body, since we are sending query params
        {
          params: payload,
          timeout: 10000, // 10 seconds timeout
        }
      );
      if (response.data.statusCode == 200) {
        return response.data;
      } else {
        return rejectWithValue(
          response.data.message || "OTP verification failed"
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
        null, // No body, since we are sending query params
        {
          params: payload,
          timeout: 10000, // 10 seconds timeout
        }
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
        null, // No body, since we are sending query params
        {
          params: payload,
          timeout: 10000, // 10 seconds timeout
        }
      );
      if (response.data.statusCode == 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message || "forget Password failed");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "forget Password failed"
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
        null, // No body, since we are sending query params
        {
          params: payload,
          timeout: 10000, // 10 seconds timeout
        }
      );
      if (response.data.statusCode == 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message || "Failed to Set Password");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to Set Password"
      );
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(otpVerify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(otpVerify.fulfilled, (state, action) => {
        state.token = action.payload.data.token;
        localStorage.setItem("token", action.payload.data.token);
        state.loading = false;
        state.error = null;
      })
      .addCase(otpVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(setPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(setPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authReducer.reducer;
