import axios from "axios";

const adminAxios = axios.create({
  baseURL: "https://ghw-s-5dby.vercel.app",
});

adminAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminAxios;
