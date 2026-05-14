import { redirect } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const authLoader = async () => {
  const authStore = useAuthStore.getState();
  await authStore.handleRefresh();
  if (useAuthStore.getState().isAuthenticated) return redirect("/home");
  return null;
};
