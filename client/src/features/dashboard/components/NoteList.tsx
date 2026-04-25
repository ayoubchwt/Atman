import NoteItem from "./NoteItem";
import { useNotes } from "../hooks/useNotes";
import { useUIStore } from "../../../store/useUIStore";

function NoteList() {
  const { notes, activeNoteId, setActiveNote } = useNotes();
  const { setSideBarOpen } = useUIStore();
  return (
    <div className="flex flex-col items-start content-start w-full flex-1 min-h-0">
      <h1 className="text-sm text-(--text-light) font-semibold pb-2">
        ALL NOTES
      </h1>
      {notes.map((note) => {
        return (
          <NoteItem
            key={note.id}
            onClick={() => {
              setActiveNote(note.id);
              setSideBarOpen(false);
            }}
            isSelected={note.id === activeNoteId}
          >
            {note.title}
          </NoteItem>
        );
      })}
    </div>
  );
}
export default NoteList;
