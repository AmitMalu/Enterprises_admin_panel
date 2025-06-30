import { USER_FORM_ENDPOINTS } from "./UserFormEndPoint";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "auth/login",
    VERIFY_OTP: "auth/verify-otp",
    RESEND_OTP: "auth/resend-otp",
    FORGET_PASSWORD: "auth/forgot-password",
    SET_PASSWORD: "auth/set-password",
  },
  MANAGEMENT: {
    USER_CREATE: USER_FORM_ENDPOINTS,
  },
  MASTER: {
    PRODUCTS: "api/products",
    SUB_PRODUCT: "api/sub-products",
    OPERATOR: "api/operators",
    VENDOR: "api/vendors",
    SUB_OPERATOR: "api/sub-operators",
    BANK_MASTER: "api/banks",
    MAIN_MASTER: "api/master",
  },
  FUNDING: {
    PREFUNDING: "api/prefund",
  },
  SCHEMES: {
    SCHEME_LIST: "api/scheme",
  },
};
