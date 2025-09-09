import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./Types";
import {
  fetchProfileInfo,
  fetchWalletBalance,
  forgetPassword,
  login,
  otpVerify,
  resendOtp,
  setPassword,
} from "./Thunk";

const initialState: AuthState = {
  loading: false,
  userInfo: {},
  error: null,
  token: null,
  walletBalance: {},
  profileInfo: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<{ userInfo: any }>) => {
      state.userInfo = action.payload.userInfo;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
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
      .addCase(otpVerify.fulfilled, (state) => {
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
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.walletBalance = action.payload.data;
      })
      .addCase(fetchProfileInfo.fulfilled, (state, action) => {
        state.profileInfo = action.payload.data;
      });
  },
});

export const { setUserInfo, setToken } = authReducer.actions;
export default authReducer.reducer;
