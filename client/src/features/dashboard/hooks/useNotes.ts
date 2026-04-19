import { useAuthStore } from "../../../store/useAuthStore";
import { useNoteStore } from "../store/useNoteStore";
import { updateNote, deleteNote, addNote } from "../../../services/NoteService";

let syncTimer: ReturnType<typeof setTimeout>;

export const useNotes = () => {
  const { isAuthenticated } = useAuthStore();
  const noteStore = useNoteStore();

  const handleAddNote = async () => {
    if (!isAuthenticated) {
      noteStore.addNote();
      return;
    }
    try {
      const savedNote = await addNote({ title: "New Note", content: "" });
      noteStore.setNotes([savedNote, ...noteStore.notes]);
      noteStore.setActiveNote(savedNote.id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateTitle = (id: string, title: string) => {
    noteStore.updateNoteTitle(id, title);

    if (isAuthenticated) {
      clearTimeout(syncTimer);
      syncTimer = setTimeout(async () => {
        try {
          await updateNote(id, { title });
          console.log("Saved Title");
        } catch (e) {
          console.error(e);
        }
      }, 2000);
    }
  };

  const handleUpdateContent = (id: string, content: string) => {
    noteStore.updateNoteContent(id, content);

    if (isAuthenticated) {
      clearTimeout(syncTimer);
      syncTimer = setTimeout(async () => {
        try {
          await updateNote(id, { content });
          console.log("Saved Content");
        } catch (e) {
          console.error(e);
        }
      }, 2000);
    }
  };

  const handleDeleteNote = async (id: string) => {
    noteStore.deleteNote(id);
    if (isAuthenticated) {
      try {
        await deleteNote(id);
      } catch (e) {
        console.error(e);
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
