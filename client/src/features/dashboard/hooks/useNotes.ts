import { useNoteStore } from "../../../store/useNoteStore";

export const useNotes = () => {
  const noteStore = useNoteStore();

  const handleAddNote = async () => {
    noteStore.addNote();
  };

  const handleSearchByTitle = (search: string) => {
    noteStore.searchNotes(search);
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
  const assignNoteToFolder = async (FolderId: string) => {
    const menuNote = noteStore.openedMenuNoteId;
    if (menuNote) await noteStore.updateNoteFolder(menuNote, FolderId);
  };
  const UnassignNoteToFolder = async () => {
    const menuNote = noteStore.openedMenuNoteId;
    if (menuNote) await noteStore.updateNoteFolder(menuNote, null);
  };
  return {
    ...noteStore,
    handleAddNote,
    handleSearchByTitle,
    handleUpdateTitle,
    handleUpdateContent,
    handleDeleteNote,
    assignNoteToFolder,
    UnassignNoteToFolder,
  };
};
