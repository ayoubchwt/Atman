import NoteItem from "./NoteItem";
import { useNotes } from "../hooks/useNotes";

function NoteList() {
  const { notes, activeNoteId, setActiveNote } = useNotes();
  return (
    <div className="flex flex-col items-start content start w-full">
      {notes.map((note) => {
        return (
          <NoteItem
            key={note.id}
            onClick={() => setActiveNote(note.id)}
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
