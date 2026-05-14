import { useAuthStore } from "../store/useAuthStore";
import { useFolderStore } from "../store/useFolderStore";
import { useNoteStore } from "../store/useNoteStore";
import { useUserStore } from "../store/useUserStore";

export const appLoader = async () => {
  const noteStore = useNoteStore.getState();
  const folderStore = useFolderStore.getState();
  const userStore = useUserStore.getState();
  
  await useAuthStore.getState().handleRefresh();
  
  if (useAuthStore.getState().isAuthenticated) {
    await Promise.all([
      noteStore.fetchNotes(),
      folderStore.fetchFolders(),
      userStore.fetchUser(),
    ]);
  } else {
    if (noteStore.notes.length === 0) noteStore.addNote();
  }
  return null;
};
