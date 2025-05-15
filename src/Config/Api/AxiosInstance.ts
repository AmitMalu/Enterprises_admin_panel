import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { API_BASE_URL, API_TIMEOUT, DEFAULT_HEADER } from './AxiosConfig';

// Create Axios config
const axiosConfig: CreateAxiosDefaults = {
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: DEFAULT_HEADER
}

// Create Axios instance
export const axiosInstance: AxiosInstance = axios.create(axiosConfig)

// // Request Interceptor
// axiosInstance.interceptors.request.use(
//     (config) => {
//         // Add Authorization header if token exists
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }

//         return config
//     },
//     (error) => {
//         // Handle request error
//         return Promise.reject(error);
//     }
// )

// // Response Interceptor
// axiosInstance.interceptors.response.use(
//     (response) => {
//         // Handle successful response
//         return response;
//     },
//     async (error) => {
//         if (error.response?.status === 401) {
//             // Handle 401 error: Unauthorized (e.g., clear token)
//             localStorage.removeItem("token");
//             window.location.href = "/login"; // Redirect to login page
//         }
//         // Handle other types of errors
//         return Promise.reject(error);
//     }
// )