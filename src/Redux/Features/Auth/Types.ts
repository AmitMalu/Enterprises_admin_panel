
export interface AuthState {
  loading: boolean;
  user: any;
  error: string | null;
  token: string | null;
}

export interface loginPayload {
  username: string | number;
  password: string;
  [key: string]: any;
}

export interface optVerifyPayload {
  username: string | number;
  otp: string | number;
  [key: string]: any;
}

export interface resendOtpPayload {
  username: string | number;
  [key: string]: any;
}

export interface forgetPasswordPayload {
  username: string | number;
  [key: string]: any;
}

export interface setPasswordPayload {
  username: string | number;
  newPassword: string;
  reEnteredPassword: string;
  [key: string]: any;
}
