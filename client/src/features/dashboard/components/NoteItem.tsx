import type { ReactNode } from "react";
import { FileText, Folder, Trash2 } from "lucide-react";
import { useNotes } from "../hooks/useNotes";
import NoteMenu from "./NoteMenu";
function NoteItem({
  children,
  noteId,
  isSelected,
  onClick,
}: {
  children: ReactNode;
  noteId: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const {
    handleDeleteNote,
    setOpenedMenuNote,
    assignNoteToFolder,
    openedMenuNoteId,
  } = useNotes();

  const isMenuOpen = openedMenuNoteId === noteId;

  return (
    <div
      onClick={onClick}
      className={`py-2 px-2 flex gap-2 items-center justify-between w-full rounded-md cursor-pointer group relative ${
        isSelected
          ? "bg-(--bg-dark)"
          : isMenuOpen
            ? "bg-(--bg)"
            : "hover:bg-(--item-light)"
      }`}
    >
      <div className="flex gap-2 items-center min-w-0">
        <FileText
          className={`w-4 h-4 shrink-0 ${isSelected ? "text-(--text)" : "text-(--text-light)"}`}
        />
        <span
          className={`text-sm truncate ${isSelected ? "text-(--text)" : "text-(--text-light)"}`}
        >
          {children?.toString().trim() ? children : "Untitled Note"}
        </span>
      </div>
      <div className="relative flex items-center gap-1">
        {isMenuOpen && (
          <NoteMenu
            onSelect={async (folderId) => {
              await assignNoteToFolder(folderId);
              setOpenedMenuNote(null);
            }}
          />
        )}
        <button
          className="group-hover:flex items-center bg-(--ghostTinted) text-(--text-light) hover:text-(--text) cursor-pointer px-1"
          onClick={(e) => {
            e.stopPropagation();
            setOpenedMenuNote(isMenuOpen ? null : noteId);
          }}
        >
          <Folder className="w-3.5 h-3.5" />
        </button>
        <button
          className="group-hover:flex items-center bg-(--ghostTinted) text-(--text-light) hover:text-(--text) cursor-pointer px-1"
          onClick={(e) => {
            e.stopPropagation();
            if (noteId) handleDeleteNote(noteId);
          }}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
export default NoteItem;
