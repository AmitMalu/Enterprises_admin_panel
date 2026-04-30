import axios from "axios";
import { API_BASE_URL, API_TIMEOUT, DEFAULT_HEADER } from "./AxiosConfig";
import { checkTokenValidity, logoutUser } from "../../Utils/utils";
import { getLocationCache } from "../../Utils/locationCache";

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

    // Add location headers
    let lat = "";
    let lng = "";
    let ipAddress = "";

    // First try to get location from cache (avoids circular dependency)
    const cachedLocation = getLocationCache();
    
    if (cachedLocation) {
      lat = cachedLocation.lat;
      lng = cachedLocation.lng;
      ipAddress = cachedLocation.ipAddress;
    }
    // Fallback to localStorage if cache doesn't have complete location data
    if (!lat || !lng || !ipAddress) {
      try {
        const persistRoot = localStorage.getItem("location persist:root");
        if (persistRoot) {
          const parsedRoot = JSON.parse(persistRoot);
          const locationData = JSON.parse(parsedRoot.location || "{}");
          lat = lat || locationData.lat || "";
          lng = lng || locationData.lng || "";
          ipAddress = ipAddress || locationData.ipAddress || "";
        }
      } catch (err) {
        console.error("ERROR reading location from persist storage:", err);
      }
    }

    if (lat && lng) {
      config.headers.set("Latitude", lat);
      config.headers.set("Longitude", lng);
    }

    if (ipAddress) {
      config.headers.set("IpAddress", ipAddress);
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

