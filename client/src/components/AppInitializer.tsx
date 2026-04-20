import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNoteStore } from "../store/useNoteStore";

function AppInitializer({ children }: { children: ReactNode }) {
  const { handleRefresh, isAuthenticated } = useAuthStore();
  const { fetchNotes } = useNoteStore();
  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  useEffect(() => {
    fetchNotes();
  }, [isAuthenticated, fetchNotes]);
  return <>{children}</>;
}
export default AppInitializer;
