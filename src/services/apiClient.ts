import axios from "axios";

/**
 * Axios instance configured for the Laravel REST API backend.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env["VITE_API_URL"] ?? "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

export const TOKEN_STORAGE_KEY = "rosui_ghor_token";

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardize error payload
    const message = error.response?.data?.message || error.message || "An unexpected error occurred.";
    const errors = error.response?.data?.errors;
    const status = error.response?.status;
    return Promise.reject({ message, errors, status, raw: error });
  }
);
