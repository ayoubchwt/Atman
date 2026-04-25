import { useFolders } from "../hooks/useFolders";
import FolderItem from "./FolderItem";

function FolderList() {
  const {
    folders,
    activeFolderId,
    setActiveFolderId,
    tempLabel,
    handleKeyDown,
    setTempLabel,
    isFolderView,
    isAddingFolder,
    setAddingFolder,
  } = useFolders();
  return (
    <div
      className={`flex-col items-start gap-2 content-start w-full ${isFolderView ? "flex" : "hidden"}`}
    >
      <h1 className="text-sm text-(--text-light) font-semibold pl-2">
        FOLDERS
      </h1>
      {isAddingFolder && (
        <FolderItem>
          <input
            autoFocus
            value={tempLabel}
            onChange={(e) => setTempLabel(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => setAddingFolder(false)}
            placeholder="Folder name ..."
          />
        </FolderItem>
      )}
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
