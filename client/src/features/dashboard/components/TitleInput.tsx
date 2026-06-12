import { useAuthStore } from "../../../store/useAuthStore";
import { useShareStore } from "../../../store/useShareStore";
import { useNotes } from "../hooks/useNotes";
import ShareBox from "./ShareBox";

function TitleInput() {
  const { activeNote, handleUpdateTitle } = useNotes();
  const { role } = useShareStore();
  const { isAuthenticated } = useAuthStore();
  const canEdit = role === "owner" || role === "editor";
  return (
    <div className="w-full py-2 px-5 flex items-center justify-between">
      <input
        type="text"
        value={activeNote?.title}
        disabled={!canEdit}
        onChange={(e) => {
          if (activeNote)
            return handleUpdateTitle(activeNote.id, e.target.value);
        }}
        placeholder="Untitled Note"
        className="w-full bg-transparent border-none outline-none font-semibold text-3xl text-(--text) font-serif"
      />
      {isAuthenticated && <ShareBox></ShareBox>}
    </div>
  );
}
export default TitleInput;
