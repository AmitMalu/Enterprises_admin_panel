export interface AuthState {
  loading: boolean;
  userInfo: any;
  error: string | null;
  token: string | null;
}

export interface loginPayload {
  userName: string | number;
  password: string;
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
