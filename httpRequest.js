import axios from "axios";
import { BASE_URL } from "./Config";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 502 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      // Optionally add some delay before retrying
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const LoginApi = (payload) => api.post("/auth/login", payload);

export const GetCustomers = (payload) => api.post("/customer/branch", payload);

export const GetBranchItems = (data) => api.post("/item/branch", data);
