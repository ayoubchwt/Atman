import { useShareStore } from "../../../store/useShareStore";
import { useUIStore } from "../../../store/useUIStore";
import { useNotes } from "../hooks/useNotes";
import { useShareNote } from "../hooks/useShareNote";
import NoteItem from "./NoteItem";

function SharedNoteList() {
  const { sharedNotes } = useShareNote();
  const { activeNoteId, setActiveNote, setActiveNoteType } = useNotes();
  const { setSideBarOpen } = useUIStore();
  const { fetchCollaborators } = useShareStore();
  return (
    <div className="flex flex-col items-start content-start w-full flex-1 min-h-0">
      <h1 className="text-sm text-(--text-light) font-semibold pb-2 pl-2">
        SHARED NOTES
      </h1>
      {sharedNotes.length === 0 && (
        <p className="p-2 text-sm text-(--text-light) w-full text-center">
          You dont have any shared notes yet !
        </p>
      )}
      {sharedNotes.map((note) => {
        return (
          <NoteItem
            key={note.id}
            noteId={note.id}
            onClick={() => {
              setActiveNote(note.id);
              setActiveNoteType("shared");
              setSideBarOpen(false);
              fetchCollaborators(note.id);
            }}
            isSelected={note.id === activeNoteId}
            isShared={true}
          >
            {note.title}
          </NoteItem>
        );
      })}
    </div>
  );
}
export default SharedNoteList;
