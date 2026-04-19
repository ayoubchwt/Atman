import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  const user = useAuthStore.getState().user;
  if (user?.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});
export default api;
