export interface AuthState {
  loading: boolean;
  userInfo: any;
  error: string | null;
  token: string | null;
  walletBalance: WalletBalance | null;
  profileInfo: profileInfo | null;
  notificationDropdowns: any;
}

export type profileInfo = {
  info: any;
  address: any;
  outletAddress: any;
  myBanks: any;
  kycDocs: any;
  [key: string]: any;
};

export type WalletBalance = {
  postpaidBalance?: number;
  prepaidBalance?: number;
  [key: string]: any;
};

export interface loginPayload {
  userName: string | number;
  password: string;
  url: string;
  [key: string]: any;
}

export interface optVerifyPayload {
  userName: string | number;
  otp: string | number;
  [key: string]: any;
}

export interface resendOtpPayload {
  userName: string | number;
  [key: string]: any;
}

export interface forgetPasswordPayload {
  userName: string | number;
  [key: string]: any;
}

export interface setPasswordPayload {
  userName: string | number;
  newPassword: string;
  reEnteredPassword: string;
  [key: string]: any;
}

export interface changePasswordPayload {
  userName: string | number;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  [key: string]: any;
}
