import { useAuthStore } from "../../../store/useAuthStore";
import { useChatboxStore } from "../../../store/useChatboxStore";
import { useFolderStore } from "../../../store/useFolderStore";
import { useNoteStore } from "../../../store/useNoteStore";
import { useThemeStore } from "../../../store/useThemeStore";
import { useUIStore } from "../../../store/useUIStore";

export const useSidebarActions = () => {
  const { isDark, toggleTheme } = useThemeStore();
  const { isAuthenticated, logout } = useAuthStore();
  const { clearNoteStore } = useNoteStore();
  const { clearFolderStore } = useFolderStore();
  const { clearMessageList } = useChatboxStore();
  const { setShareOpen } = useUIStore();
  const handleLogout = async () => {
    clearNoteStore();
    clearFolderStore();
    clearMessageList();
    setShareOpen(false);
    logout();
  };
  return {
    handleLogout,
    isAuthenticated,
    toggleTheme,
    isDark,
  };
};
