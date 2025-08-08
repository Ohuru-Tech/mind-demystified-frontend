import axios from "axios";
import { ErrorHandler } from "./errorHandler";

export const axiosInstance = axios.create({
  baseURL: "https://mind-demystified-backend-0dd3e7300e77.herokuapp.com/api",
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for common headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any common headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Convert axios errors to our AppError format
    const appError = ErrorHandler.handle(error);
    return Promise.reject(appError);
  }
);
