import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const host: string | undefined = import.meta.env.VITE_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: host ? `${host}/` : "/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Reject when server does not respond or an internal server error occurred.
    if (
      !error.response ||
      (error.response.status && error.response.status >= 500)
    ) {
      return Promise.reject(error);
    }

    // Normal case
    return Promise.resolve(error.response);
  }
);

export default api;
