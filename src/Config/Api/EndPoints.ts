import { USER_FORM_ENDPOINTS } from "./UserFormEndPoint";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "auth/login",
    VERIFY_OTP: "auth/verify-otp",
    RESEND_OTP: "auth/resend-otp",
    FORGET_PASSWORD: "auth/forgot-password",
    SET_PASSWORD: "auth/set-password",
    WALLET_BALANCE: "/api/dashboard/wallet-balance",
  },
  MANAGEMENT: {
    USER_CREATE: USER_FORM_ENDPOINTS,
    USER_CONFIGURATION: "api/user-config",
    MENU: "api/menus",
    USER_AUTH: "api/onboarding",
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
    SCHEME_RATE: "api/scheme-rate",
  },
};
