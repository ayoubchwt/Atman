import { useAuthStore } from "../../../store/useAuthStore";
import { useNoteStore } from "../store/useNoteStore";
import type { CreateNoteDto } from "../../../types/Note";
import {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
} from "../../../services/NoteService";
export const useNotes = () => {
  const { isAuthenticated } = useAuthStore();
  const noteStore = useNoteStore();
  const handleAddNote = async (note: CreateNoteDto) => {
    if (isAuthenticated) {
      try {
        await addNote(note);
      } catch (error) {
        console.log("Error while creating note", error);
      }
    } else {
      noteStore.addNote(note);
    }
  };
  const handleUpdateTitle = async (id: string, title: string) => {
    noteStore.updateNoteTitle(id, title);
    if (isAuthenticated) {
      try {
        await updateNote(id, { title: title });
      } catch (error) {
        console.log("Error while updating note title", error);
      }
    }
  };
  const handleUpdateContent = async (id: string, content: string) => {
    noteStore.updateNoteContent(id, content);
    if (isAuthenticated) {
      try {
        await updateNote(id, { content: content });
      } catch (error) {
        console.log("error while updating note content", error);
      }
    }
  };
  const handleDeleteNote = async (id: string) => {
    noteStore.deleteNote(id);
    if (isAuthenticated) {
      try {
        await deleteNote(id);
      } catch (error) {
        console.log("error deleting note", error);
      }
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
