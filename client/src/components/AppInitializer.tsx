import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNoteStore } from "../store/useNoteStore";
import { useFolderStore } from "../store/useFolderStore";

function AppInitializer({ children }: { children: ReactNode }) {
  const { handleRefresh, isAuthenticated } = useAuthStore();
  const { fetchNotes } = useNoteStore();
  const { fetchFolders } = useFolderStore();
  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
      fetchFolders();
    }
  }, [isAuthenticated, fetchNotes, fetchFolders]);
  return <>{children}</>;
}
export default AppInitializer;
