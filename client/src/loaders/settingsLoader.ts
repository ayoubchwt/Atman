import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import { redirect } from "react-router-dom";
export const settingsLoader = async () => {
  const userStore = useUserStore.getState();
  const authStore = useAuthStore.getState();
  if (!authStore.isAuthenticated) return redirect("/auth/login");
  await userStore.fetchUserSettings();
  return null;
};
