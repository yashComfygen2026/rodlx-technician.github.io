import axios from "axios";

export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api-dev.rodlx.com/api/v1";

const AUTH_STORAGE_KEY = "rodlx_technician_auth";

export const authStorage = {
  get() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  set(data) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  },
  clear() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

apiClient.interceptors.request.use((config) => {
  const auth = authStorage.get();
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

// Backend envelope is { message, code, error, data }; unwrap to `data` and
// normalize failures (both transport errors and `error: true` responses)
// into a single Error carrying the server message.
apiClient.interceptors.response.use(
  (response) => {
    if (response.data?.error) {
      return Promise.reject(
        new Error(response.data.message || "Something went wrong."),
      );
    }
    return response.data?.data;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    if (error.response?.status === 401) {
      authStorage.clear();
    }
    return Promise.reject(new Error(message));
  },
);
