import axios from "axios";

const adminAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

adminAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ VERY IMPORTANT: allow FormData
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

export default adminAxios;
