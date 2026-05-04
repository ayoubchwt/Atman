import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useFolderStore } from "../store/useFolderStore";
import { useNoteStore } from "../store/useNoteStore";
import { useUserStore } from "../store/useUserStore";

export const useInitializeApp = () => {
  const { handleRefresh, isAuthenticated } = useAuthStore();
  const { fetchNotes, addNote, notes } = useNoteStore();
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
    }
  }, [isAuthenticated, fetchNotes, fetchFolders, fetchUser]);

  useEffect(() => {
    if (!isAuthenticated && notes.length === 0) addNote();
  }, [isAuthenticated, notes.length, addNote]);
};
