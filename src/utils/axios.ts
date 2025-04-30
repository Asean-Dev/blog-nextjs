import { CONFIG } from "@/config";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import Cookies from "js-cookie";
import { getToken } from "./cookie";
const axiosInstance = axios.create({ baseURL: CONFIG.apiUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
);
export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config = {}] = Array.isArray(args) ? args : [args, {}];

    const token = getToken();

    const headers = {
      ...config.headers,
      ...(token && token.Authorization),
    };

    const res = await axiosInstance.get(url, {
      ...config,
      headers,
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Axios Error:");
      console.error("URL:", error.config?.url);
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);
    }
    throw error;
  }
};

export const endpoints = {
  user: "api/user",
  blog: "api/blog",
};

export type listMeta = {
  current: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export interface IRespontMeta {
  code: number;
  success: boolean;
  message: string;
}
