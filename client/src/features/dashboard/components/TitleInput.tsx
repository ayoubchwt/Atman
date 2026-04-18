import { useNotes } from "../hooks/useNotes";

function TitleInput() {
  const { notes, activeNoteId, handleUpdateTitle } = useNotes();
  const activeNote = notes.find((note) => note.id === activeNoteId);
  return (
    <div className="w-full py-2 px-5">
      <input
        type="text"
        value={activeNote?.title || ""}
        onChange={(e) => {
          if (activeNote)
            return handleUpdateTitle(activeNote?.id, e.target.value);
        }}
        placeholder="Untitled Note"
        className="w-full bg-transparent border-none outline-none font-semibold text-3xl text-(--text) font-serif"
      />
    </div>
  );
}
export default TitleInput;
