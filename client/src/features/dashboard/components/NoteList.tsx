import NoteItem from "./NoteItem";
import { useNotes } from "../hooks/useNotes";
import { useUIStore } from "../../../store/useUIStore";

function NoteList() {
  const { notes, activeNoteId, setActiveNote } = useNotes();
  const { setSideBarOpen } = useUIStore();
  return (
    <div className="flex flex-col items-start content-start w-full flex-1 min-h-0">
      <h1 className="text-sm text-(--text-light) font-semibold pb-2 pl-2">
        NOTES
      </h1>
      {notes.length === 0 && (
        <p className="p-2 text-sm text-(--text-light) w-full text-center">
          You didn't add any notes yet !
        </p>
      )}
      {notes.map((note) => {
        return (
          <NoteItem
            key={note.id}
            noteId={note.id}
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
