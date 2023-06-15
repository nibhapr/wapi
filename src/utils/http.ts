import axios from "axios";
import { getToken } from "./auth-utils";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WAPI_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const { token } = getToken();
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
