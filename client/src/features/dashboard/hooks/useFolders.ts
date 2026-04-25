import React, { useState } from "react";
import { useFolderStore } from "../../../store/useFolderStore";
import { useUIStore } from "../../../store/useUIStore";

export const useFolders = () => {
  const folderStore = useFolderStore();
  const uiStore = useUIStore();
  const [tempLabel, setTempLabel] = useState("");
  const [extendedFolderId, setExtendedFolderIdState] = useState<string>("");
  const setExtendedFolderId = async (id: string) => {
    if (extendedFolderId === id) {
      setExtendedFolderIdState("");
    } else {
      await folderStore.FetchFolderNotes(id);
      setExtendedFolderIdState(id);
    }
  };
  const handleDeleteNote = (id: string) => {
    console.log("stop crying about not using you : ", id);
    return;
  };
  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      uiStore.setAddingFolder(false);
      setTempLabel("");
    }
    if (e.key === "Enter" && tempLabel.trim()) {
      await folderStore.addFolder({ label: tempLabel });
      uiStore.setAddingFolder(false);
      setTempLabel("");
    }
  };
  return {
    ...folderStore,
    ...uiStore,
    tempLabel,
    handleKeyDown,
    setTempLabel,
    handleDeleteNote,
    extendedFolderId,
    setExtendedFolderId,
  };
};
