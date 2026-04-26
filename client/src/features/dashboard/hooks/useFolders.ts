import { useState } from "react";
import { useFolderStore } from "../../../store/useFolderStore";
import { useUIStore } from "../../../store/useUIStore";

export const useFolders = () => {
  const folderStore = useFolderStore();
  const uiStore = useUIStore();
  const [extendedFolderId, setExtendedFolderIdState] = useState<string>("");
  const setExtendedFolderId = async (id: string) => {
    if (extendedFolderId === id) {
      setExtendedFolderIdState("");
    } else {
      await folderStore.FetchFolderNotes(id);
      setExtendedFolderIdState(id);
    }
  };
  const handleDeleteFolder = async (id: string) => {
    await folderStore.deleteFolder(id);
  };
  const handleAddFolder = async (label: string) => {
    await folderStore.addFolder({ label: label });
  };
  const handleUpdateFolder = async (id: string, label: string) => {
    await folderStore.updateFolder(id, { label: label });
  };
  return {
    ...folderStore,
    ...uiStore,
    handleAddFolder,
    handleUpdateFolder,
    handleDeleteFolder,
    extendedFolderId,
    setExtendedFolderId,
  };
};
