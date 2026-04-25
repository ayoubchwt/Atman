import { useState } from "react";
import { useFolderStore } from "../../../store/useFolderStore";

export const useFolders = () => {
  const folderStore = useFolderStore();
  const [tempLabel, setTempLabel] = useState("");
  const handleAddFolder = () => {
    return;
  };
  const handleDeleteNote = (id: string) => {
    console.log("stop crying about not using you : ", id);
    return;
  };
  const handleKeyDown = () => {
    // console me
  };
  return {
    ...folderStore,
    tempLabel,
    handleKeyDown,
    setTempLabel,
    handleAddFolder,
    handleDeleteNote,
  };
};
