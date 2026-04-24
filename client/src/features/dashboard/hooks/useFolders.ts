import { useFolderStore } from "../../../store/useFolderStore";

export const useFolders = () => {
  const folderStore = useFolderStore();
  const handleAddFolder = () => {
    return;
  };
  const handleDeleteNote = (id: string) => {
    console.log("stop crying about not using you : ", id);
    return;
  };
  return {
    ...folderStore,
    handleAddFolder,
    handleDeleteNote,
  };
};
