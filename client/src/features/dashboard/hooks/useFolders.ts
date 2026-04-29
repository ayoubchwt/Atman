import { useFolderStore } from "../../../store/useFolderStore";
import { useNoteStore } from "../../../store/useNoteStore";
import { useUIStore } from "../../../store/useUIStore";

export const useFolders = () => {
  const folderStore = useFolderStore();
  const uiStore = useUIStore();
  const { notes } = useNoteStore();
  const handleDeleteFolder = async (id: string) => {
    await folderStore.deleteFolder(id);
  };
  const handleAddFolder = async (label: string) => {
    await folderStore.addFolder({ label: label });
  };
  const handleUpdateFolder = async (id: string, label: string) => {
    await folderStore.updateFolder(id, { label: label });
  };
  const folderNotes = notes.filter(
    (note) => note.folder === folderStore.extendedFolderId,
  );
  return {
    ...folderStore,
    ...uiStore,
    handleAddFolder,
    handleUpdateFolder,
    handleDeleteFolder,
    folderNotes,
  };
};
