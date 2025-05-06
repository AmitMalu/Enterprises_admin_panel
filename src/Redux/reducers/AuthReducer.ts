import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface AuthState {
  loading: boolean;
  user: any;
  error: string | null;
}

interface loginPayload {
  username: string | number;
  password: string;
  [key: string]: any;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (payload: loginPayload, { rejectWithValue }) => {
    const url = "http://192.168.1.219:8081/adminPortal/auth/login";
    try {
      const response = await axios.post(
        url,
        null, // No body, since we are sending query params
        {
          params: payload,
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
      });
  },
});

export default authReducer.reducer;
