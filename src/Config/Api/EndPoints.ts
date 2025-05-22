import { USER_FORM_ENDPOINTS } from "./UserFormEndPoint";

export const API_ENDPOINTS = {
    AUTH : {
        LOGIN : "auth/login",
        VERIFY_OTP : "auth/verify-otp",
        RESEND_OTP : "auth/resend-otp",
        FORGET_PASSWORD : "auth/forget-password",
        SET_PASSWORD : "auth/set-password"
    },
    MANAGEMENT : {
        USER_CREATE : USER_FORM_ENDPOINTS
    }
}