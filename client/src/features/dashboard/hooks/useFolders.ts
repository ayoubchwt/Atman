import React, { useState } from "react";
import { useFolderStore } from "../../../store/useFolderStore";
import { useUIStore } from "../../../store/useUIStore";

export const useFolders = () => {
  const folderStore = useFolderStore();
  const uiStore = useUIStore();
  const [tempLabel, setTempLabel] = useState("");
  const handleAddFolder = () => {
    return;
  };
  const handleDeleteNote = (id: string) => {
    console.log("stop crying about not using you : ", id);
    return;
  };
  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      uiStore.setAddingFolder(false);
    }
    if (e.key === "Enter" && tempLabel.trim()) {
      await folderStore.addFolder({ label: tempLabel });
      uiStore.setAddingFolder(false);
    }
  };
  return {
    ...folderStore,
    ...uiStore,
    tempLabel,
    handleKeyDown,
    setTempLabel,
    handleAddFolder,
    handleDeleteNote,
  };
};
