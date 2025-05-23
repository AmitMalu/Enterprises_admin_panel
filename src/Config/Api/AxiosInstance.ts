import axios from "axios";
import { API_BASE_URL, API_TIMEOUT, DEFAULT_HEADER } from "./AxiosConfig";
import { checkTokenValidity, logoutUser } from "../../Utils/utils";

// Create Axios config
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: DEFAULT_HEADER,
});

// --- Request Interceptor ---
axiosInstance.interceptors.request.use(
  (config) => {
    // Add Authorization header if token exists
    const token = localStorage.getItem("token");

    if (checkTokenValidity(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Clear expired/invalid tokens
      localStorage.removeItem("token");
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Optionally check if token is expired
      logoutUser("Session Expired, please try again after 5 minutes");
    }

    return Promise.reject(error);
  }
);
