import axios from "axios";

/**
 * Axios instance ready for the future Laravel API.
 * While the backend does not exist yet, services resolve against the
 * isolated mock layer (see ./mock*.ts) instead of issuing requests.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env["VITE_API_URL"] ?? "/api",
  headers: { Accept: "application/json" },
});

export const TOKEN_STORAGE_KEY = "rosui_ghor_token";

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Simulated network latency for the mock layer. */
export const delay = (ms = 350) => new Promise<void>((resolve) => setTimeout(resolve, ms));
