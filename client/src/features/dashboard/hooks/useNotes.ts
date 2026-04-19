import { useAuthStore } from "../../../store/useAuthStore";
import { useNoteStore } from "../store/useNoteStore";
import { updateNote, deleteNote, addNote } from "../../../services/NoteService";
import { useCallback } from "react";

export const useNotes = () => {
  const { isAuthenticated } = useAuthStore();
  const noteStore = useNoteStore();

  const handleAddNote = async () => {
    noteStore.addNote();
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

  const syncNote = async (id: string, title: string, content: string) => {
    if (!isAuthenticated) return;
    const note = noteStore.notes.find((note) => note.id === id);
    if (!title.trim() || !content.trim()) return;
    try {
      if (note?.isLocal) {
        const savedNote = await addNote({ title, content });
        noteStore.replaceNote(note.id, savedNote);
      } else {
        await updateNote(id, { title, content });
      }
    } catch (error) {
      console.log("Sync error", error);
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
