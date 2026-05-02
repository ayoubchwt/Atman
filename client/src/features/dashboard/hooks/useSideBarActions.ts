import { useAuthStore } from "../../../store/useAuthStore";
import { useChatboxStore } from "../../../store/useChatboxStore";
import { useFolderStore } from "../../../store/useFolderStore";
import { useNoteStore } from "../../../store/useNoteStore";
import { useThemeStore } from "../../../store/useThemeStore";

export const useSidebarActions = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const { isAuthenticated, logout } = useAuthStore();
  const { clearNoteStore } = useNoteStore();
  const { clearFolderStore } = useFolderStore();
  const { clearMessageList } = useChatboxStore();
  const handleLogout = async () => {
    clearNoteStore();
    clearFolderStore();
    clearMessageList();
    logout();
  };
  return {
    handleLogout,
    isAuthenticated,
    toggleTheme,
    isDark,
  };
};
