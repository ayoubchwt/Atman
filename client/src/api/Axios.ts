import axios, { AxiosError } from "axios";
import { useAuthStore } from "../store/useAuthStore";
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
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
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalResquest = error.config;
    if (error.status === 401 && originalResquest) {
      try {
        await useAuthStore.getState().handleRefresh();
        const newAccessToken = useAuthStore.getState().user?.accessToken;
        if (newAccessToken) {
          originalResquest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalResquest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
export default api;
