import { useAuthStore } from "../../../store/useAuthStore";
import { useFolderStore } from "../../../store/useFolderStore";
import { useNoteStore } from "../../../store/useNoteStore";
import { useThemeStore } from "../../../store/useThemeStore";

export const useSidebarActions = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const { isAuthenticated, logout } = useAuthStore();
  const { clearNoteStore } = useNoteStore();
  const { clearFolderStore } = useFolderStore();

  const handleLogout = async () => {
    logout();
    clearNoteStore();
    clearFolderStore();
  };
  return {
    handleLogout,
    isAuthenticated,
    toggleTheme,
    isDark,
  };
};
