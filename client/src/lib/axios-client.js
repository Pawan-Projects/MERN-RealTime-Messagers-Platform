// lib/api.js
import axios from "axios";
import { TOKEN_KEY } from "../constants/api.routes";

export const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? `${import.meta.env.VITE_API_URL}/api`
      : "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);