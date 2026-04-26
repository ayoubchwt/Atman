import { ChevronDown, ChevronRight, Folder, Pen, Trash2 } from "lucide-react";
import { useFolders } from "../hooks/useFolders";

function FolderItem({
  children,
  folderId,
  isSelected,
  onClick,
}: {
  children?: React.ReactNode;
  folderId?: string;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  const { handleDeleteFolder, setUpdatingFolder } = useFolders();
  return (
    <div
      onClick={onClick}
      className={`py-2 px-2 flex gap-2 items-center justify-between w-full rounded-md cursor-pointer group ${
        isSelected ? "bg-(--bg-dark)" : "bg-(--bg) hover:bg-(--item-light)"
      }`}
    >
      <div className="flex gap-2 items-center flex-1 min-w-0 text-(--text)">
        {isSelected ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
        <Folder
          className={`w-4 h-4 shrink-0 ${isSelected ? "text-(--text)" : "text-(--text-light)"}`}
        ></Folder>
        <span
          className={`text-sm truncate ${isSelected ? "text-(--text)" : "text-(--text-light)"}`}
        >
          {children?.toString().trim() ? children : "Untitled Folder"}
        </span>
      </div>
      <div className="flex items-center justify-between md:invisible group-hover:visible">
        <button
          className=" bg-(--ghostTinted) text-(--text-light) hover:text-(--text) cursor-pointer px-1"
          onClick={(e) => {
            e.stopPropagation();
            setUpdatingFolder(true);
          }}
        >
          <Pen className="w-3.5 h-3.5"></Pen>
        </button>
        <button
          className="bg-(--ghostTinted) text-(--text-light) hover:text-(--text) cursor-pointer px-1"
          onClick={async (e) => {
            e.stopPropagation();
            if (folderId) return await handleDeleteFolder(folderId);
          }}
        >
          <Trash2 className="w-3.5 h-3.5"></Trash2>
        </button>
      </div>
    </div>
  );
}
export default FolderItem;
