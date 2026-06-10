import { useAuthStore } from "../store/useAuthStore";
import { useFolderStore } from "../store/useFolderStore";
import { useNoteStore } from "../store/useNoteStore";
import { useShareStore } from "../store/useShareStore";
import { useUserStore } from "../store/useUserStore";
import { listentToUpdate } from "../utils/SocketHelpers";

export const appLoader = async () => {
  const noteStore = useNoteStore.getState();
  const folderStore = useFolderStore.getState();
  const userStore = useUserStore.getState();
  const shareStore = useShareStore.getState();

  await useAuthStore.getState().handleRefresh();
  if (useAuthStore.getState().isAuthenticated) {
    await Promise.all([
      folderStore.fetchFolders(),
      userStore.fetchUser(),
      noteStore.fetchNotes(),
      shareStore.fetchSharedNotes(),
    ]);
    await shareStore.fetchCollaborators(useNoteStore.getState().activeNoteId!);
    listentToUpdate();
  } else {
    if (noteStore.notes.length === 0) noteStore.addNote();
  }
  return null;
};
