import { useFolderStore } from "../../../store/useFolderStore";
import { useUIStore } from "../../../store/useUIStore";

export const useFolders = () => {
  const folderStore = useFolderStore();
  const uiStore = useUIStore();
  const handleDeleteFolder = async (id: string) => {
    await folderStore.deleteFolder(id);
  };
  const handleAddFolder = async (label: string) => {
    await folderStore.addFolder({ label: label });
  };
  const handleUpdateFolder = async (id: string, label: string) => {
    await folderStore.updateFolder(id, { label: label });
  };
  const handleFolderRefresh = async () => {
    const extendedFolderId = folderStore.extendedFolderId;
    if (extendedFolderId) await folderStore.FetchFolderNotes(extendedFolderId);
  };
  return {
    ...folderStore,
    ...uiStore,
    handleAddFolder,
    handleUpdateFolder,
    handleDeleteFolder,
    handleFolderRefresh,
  };
};
