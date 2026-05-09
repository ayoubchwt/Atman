import axios, { AxiosError } from "axios";
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
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalResquest = error.config;
    console.log("about to refresh ...");
    console.log("error code", error.status);
    if (error.status === 401) {
      console.log("refresing ...");
      await useAuthStore.getState().handleRefresh();
      const newAccessToken = useAuthStore.getState().user?.accessToken;
      if (newAccessToken && originalResquest) {
        originalResquest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalResquest);
      }
    }
    return Promise.reject(error);
  },
);
export default api;
