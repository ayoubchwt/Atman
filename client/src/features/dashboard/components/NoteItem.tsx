import type { ReactNode } from "react";
import { FileText, Trash2 } from "lucide-react";
import { useNotes } from "../hooks/useNotes";
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
  const { handleDeleteNote } = useNotes();
  return (
    <div
      onClick={onClick}
      className={`py-2 px-2 flex gap-2 items-center justify-between w-full rounded-md cursor-pointer group ${
        isSelected ? "bg-(--bg-dark)" : "bg-(--bg) hover:bg-(--item-light)"
      }`}
    >
      <div className="flex gap-2 items-center min-w-0">
        <FileText
          className={`w-4 h-4 shrink-0 ${isSelected ? "text-(--text)" : "text-(--text-light)"}`}
        ></FileText>
        <span
          className={`text-sm truncate ${isSelected ? "text-(--text)" : "text-(--text-light)"}`}
        >
          {children?.toString().trim() ? children : "Untitled Note"}
        </span>
      </div>
      <button
        className="md:hidden group-hover:block bg-(--ghostTinted) text-(--text-light) hover:text-(--text) cursor-pointer px-1"
        onClick={(e) => {
          e.stopPropagation();
          if (noteId) return handleDeleteNote(noteId);
        }}
      >
        <Trash2 className="w-3.5 h-3.5"></Trash2>
      </button>
    </div>
  );
}
export default NoteItem;
