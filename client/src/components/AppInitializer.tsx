import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNoteStore } from "../store/useNoteStore";
import { useFolderStore } from "../store/useFolderStore";
import { useUserStore } from "../store/useUserStore";

function AppInitializer({ children }: { children: ReactNode }) {
  const { handleRefresh, isAuthenticated } = useAuthStore();
  const { fetchNotes, addNote } = useNoteStore();
  const { fetchFolders } = useFolderStore();
  const { fetchUser } = useUserStore();
  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
      fetchFolders();
      fetchUser();
    } else {
      addNote();
    }
  }, [isAuthenticated, fetchNotes, fetchFolders, fetchUser, addNote]);
  return <>{children}</>;
}
export default AppInitializer;
