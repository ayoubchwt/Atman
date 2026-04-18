import { useAuthStore } from "../../../store/useAuthStore";
import { useNoteStore } from "../store/useNoteStore";
import type { CreateNoteDto } from "../../../types/Note";

export const useNotes = () => {
  const { isAuthenticated, user } = useAuthStore();
  const noteStore = useNoteStore();
  const handleAddNote = async (note: CreateNoteDto) => {
    if (!note.title.trim() && !note.content.trim()) {
      return;
    }
    if (isAuthenticated) {
      //add to db
    } else {
      noteStore.addNote(note);
    }
  };

  return { handleAddNote };
};
