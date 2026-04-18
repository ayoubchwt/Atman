import { useAuthStore } from "../../../store/useAuthStore";
import { useNoteStore } from "../store/useNoteStore";
import type { CreateNoteDto } from "../../../types/Note";

export const useNotes = () => {
  const { isAuthenticated } = useAuthStore();
  const noteStore = useNoteStore();
  const handleAddNote = async (note: CreateNoteDto) => {
    if (note.title.trim() && note.content.trim() && isAuthenticated) {
      //add to db
    } else {
      noteStore.addNote(note);
    }
  };
  const handleUpdateTitle = async (id: string, title: string) => {
    noteStore.updateNoteTitle(id, title);
    if (isAuthenticated) {
      // update in db
    }
  };
  const handleUpdateContent = async (id: string, content: string) => {
    noteStore.updateNoteContent(id, content);
    if (isAuthenticated) {
      // update in db
    }
  };
  const handleDeleteNote = async (id: string) => {
    noteStore.deleteNote(id);
    if (isAuthenticated) {
      // delete in db
    }
  };
  return {
    ...noteStore,
    handleAddNote,
    handleUpdateTitle,
    handleUpdateContent,
    handleDeleteNote,
  };
};
