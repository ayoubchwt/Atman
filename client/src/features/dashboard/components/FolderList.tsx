import { useUIStore } from "../../../store/useUIStore";
import { useFolders } from "../hooks/useFolders";
import FolderItem from "./FolderItem";

function FolderList() {
  const { folders, activeFolderId, setActiveFolderId } = useFolders();
  const { isFolderView } = useUIStore();
  return (
    <div
      className={`flex-col items-start gap-2 content-start w-full ${isFolderView ? "flex" : "hidden"}`}
    >
      <h1 className="text-sm text-(--text-light) font-semibold">FOLDERS</h1>
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
