import { FolderOpen } from "lucide-react";
import { useFolders } from "../hooks/useFolders";

function NoteMenu({ onSelect }: { onSelect: (id: string) => Promise<void> }) {
  const { folders } = useFolders();
  return (
    <div className="absolute top-full right-0 mt-1 w-40 bg-(--bg-light) border-(--bg) rounded-md shadow-md z-50 flex flex-col">
      <h1 className="text-sm text-(--text-light) font-bold px-2 py-1 border-b border-(--item-light)">
        Move To
      </h1>
      <div className="flex flex-col w-full max-h-40 overflow-y-auto scrollbar-hide">
        {!folders.length ? (
          <p className="text-xs text-(--text-light) p-2">No Folders</p>
        ) : (
          folders.map((folder) => (
            <div
              className="flex items-center gap-2 w-full px-2 py-1.5 hover:bg-(--item-light) hover:rounded-md cursor-pointer"
              key={folder.id}
              onClick={async (e) => {
                e.stopPropagation();
                await onSelect(folder.id);
              }}
            >
              <FolderOpen className="text-(--text) w-4 h-4"></FolderOpen>
              <span className="text-sm text-(--text) truncate min-w-0 flex-1">
                {folder.label}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default NoteMenu;
