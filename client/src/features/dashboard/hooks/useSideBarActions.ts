import { useAuthStore } from "../../../store/useAuthStore";
import { useNoteStore } from "../../../store/useNoteStore";
import { useThemeStore } from "../../../store/useThemeStore";

export const useSidebarActions = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const { isAuthenticated, logout } = useAuthStore();
  const { clearStore } = useNoteStore();

  const handleLogout = async () => {
    logout();
    clearStore();
  };
  return {
    handleLogout,
    isAuthenticated,
    toggleTheme,
    isDark,
  };
};
