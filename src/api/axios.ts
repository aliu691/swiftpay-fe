import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/* ===========================
   TOKEN HELPER
=========================== */

const getStoredToken = () => {
  const localToken = localStorage.getItem("token");
  if (localToken) return localToken;

  const cookieToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  return cookieToken || null;
};

/* ===========================
   REQUEST INTERCEPTOR
=========================== */

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getStoredToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ===========================
   RESPONSE INTERCEPTOR
=========================== */

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default api;
