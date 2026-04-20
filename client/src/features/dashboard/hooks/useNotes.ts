import { useNoteStore } from "../../../store/useNoteStore";

export const useNotes = () => {
  const noteStore = useNoteStore();

  const handleAddNote = async () => {
    noteStore.addNote();
  };

  const handleUpdateTitle = (id: string, title: string) => {
    noteStore.updateNoteTitle(id, title);
  };

  const handleUpdateContent = (id: string, content: string) => {
    noteStore.updateNoteContent(id, content);
  };

  const handleDeleteNote = async (id: string) => {
    noteStore.deleteNote(id);
  };

  return {
    ...noteStore,
    handleAddNote,
    handleUpdateTitle,
    handleUpdateContent,
    handleDeleteNote,
  };
};
