import { useUIStore } from "../../../store/useUIStore";

export const useFolderActions = () => {
  const { isFolderView, setFolderView } = useUIStore();
  return {
    isFolderView,
    setFolderView,
  };
};
