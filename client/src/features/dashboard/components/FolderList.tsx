import { useFolders } from "../hooks/useFolders";
import FolderItem from "./FolderItem";

function FolderList() {
  const { folders, activeFolderId, setActiveFolderId } = useFolders();
  return (
    <div className="flex flex-col items-start content-start w-full flex-1 min-h-0 overflow-y-auto scrollbar-hide">
      {folders.map((folder) => {
        return (
          <FolderItem
            key={folder.id}
            isSelected={folder.id === activeFolderId}
            onClick={() => {
              setActiveFolderId(folder.id);
            }}
          >
            {folder.label}
          </FolderItem>
        );
      })}
    </div>
  );
}
export default FolderList;
