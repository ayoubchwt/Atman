import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import { redirect } from "react-router-dom";
export const settingsLoader = async () => {
  const userStore = useUserStore.getState();
  const authStore = useAuthStore.getState();
  // the refresh function is racing this part (needs to be fixed later)
  if (!authStore.isAuthenticated) return redirect("/auth/login");
  await userStore.fetchUserSettings();
  return null;
};
