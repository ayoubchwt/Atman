import { FolderOpen, FolderX } from "lucide-react";
import { useFolders } from "../hooks/useFolders";

function NoteMenu({
  onSelect,
  onDeselect,
}: {
  onSelect: (id: string) => Promise<void>;
  onDeselect: () => Promise<void>;
}) {
  const { folders } = useFolders();

  return (
    <div className="absolute top-full right-0 mt-1 w-40 bg-(--bg-light) border border-(--bg) rounded-md shadow-md z-50 flex flex-col">
      <h1 className="text-sm text-(--text-light) font-bold px-2 py-1 border-b border-(--item-light)">
        Move To
      </h1>
      <div className="flex flex-col w-full max-h-40 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {!folders.length ? (
          <p className="text-xs text-(--text-light) p-2">No Folders</p>
        ) : (
          <>
            <div
              className="flex items-center gap-2 w-full px-2 py-1.5 hover:bg-(--item-light) hover:rounded-md cursor-pointer"
              onClick={async (e) => {
                e.stopPropagation();
                await onDeselect();
              }}
            >
              <FolderX className="text-(--text) w-4 h-4"></FolderX>
              <span className="text-sm text-(--text)">No Folder</span>
            </div>

            {folders.map((folder) => (
              <div
                className="flex items-center gap-2 w-full px-2 py-1.5 hover:bg-(--item-light) hover:rounded-md cursor-pointer"
                key={folder.id}
                onClick={async (e) => {
                  e.stopPropagation();
                  await onSelect(folder.id);
                }}
              >
                <FolderOpen className="text-(--text) w-4 h-4" />
                <span className="text-sm text-(--text) truncate min-w-0 flex-1">
                  {folder.label}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default NoteMenu;
