import { create } from "zustand";
import type { NoteResponseDto } from "../types/Note";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
  getNotesByTitle,
  getNote,
} from "../services/NoteService";
import { useAuthStore } from "./useAuthStore";
import { useErrorStore } from "./useErrorStore";
import { getErrorMessage } from "../utils/getError";
import { useShareStore } from "./useShareStore";
import { changeRoom } from "../utils/SocketHelpers";

let syncTimer: ReturnType<typeof setTimeout>;
interface NoteState {
  notes: NoteResponseDto[];
  activeNote: NoteResponseDto | null;
  activeNoteType: "owned" | "shared";
  openedMenuNoteId: string | null;
  getActiveNote: () => NoteResponseDto;
  fetchNotes: () => Promise<void>;
  fetchNote: (noteId: string) => Promise<void>;
  searchNotes: (search: string) => Promise<void>;
  setActiveNote: (note: NoteResponseDto) => void;
  setActiveNoteType: (type: "owned" | "shared") => void;
  setOpenedMenuNote: (id: string | null) => void;
  updateNoteTitle: (id: string, title: string) => void;
  updateNoteContent: (id: string, content: string) => void;
  updateNoteFolder: (id: string, folder: string | null) => Promise<void>;
  addNote: () => void;
  deleteNote: (id: string | null) => void;
  clearNoteStore: () => void;
}
export const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  activeNote: null,
  activeNoteType: "owned",
  openedMenuNoteId: null,
  getActiveNote: (): NoteResponseDto => {
    const { activeNote, notes } = get();
    return notes.find((note) => note.id === activeNote?.id)!;
  },
  fetchNotes: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) return;
    try {
      const { setActiveNote } = get();
      const result = await getNotes();
      set({ notes: result });
      setActiveNote(result[0]);
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
    }
  },
  fetchNote: async (noteId) => {
    try {
      const result = await getNote(noteId);
      set((state) => ({
        notes: state.notes.map((note) => (note.id === noteId ? result : note)),
        activeNote: state.activeNote?.id === noteId ? result : state.activeNote,
      }));
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
    }
  },
  searchNotes: async (search) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(async () => {
      try {
        const result = await getNotesByTitle(search);
        set({ notes: result });
      } catch (error) {
        const { setError } = useErrorStore.getState();
        setError(getErrorMessage(error));
      }
    }, 200);
  },
  setActiveNote: (note: NoteResponseDto) => {
    if (!note) return;
    set({ activeNote: note });
    changeRoom(note.id);
  },
  setActiveNoteType: (type) => set({ activeNoteType: type }),
  setOpenedMenuNote: (id): void => set({ openedMenuNoteId: id }),
  updateNoteTitle: (id, title) => {
    const { activeNoteType } = get();

    if (activeNoteType === "shared") {
      useShareStore.setState((state) => ({
        sharedNotes: state.sharedNotes.map((note) =>
          note.id === id ? { ...note, title } : note,
        ),
      }));
    } else {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id ? { ...note, title } : note,
        ),
        activeNote:
          state.activeNote?.id === id
            ? { ...state.activeNote, title }
            : state.activeNote,
      }));
    }
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      const { activeNote } = get();
      clearTimeout(syncTimer);
      syncTimer = setTimeout(async () => {
        try {
          if (activeNote)
            await updateNote({ noteId: activeNote.id, title: title });
        } catch (error) {
          const { setError } = useErrorStore.getState();
          setError(getErrorMessage(error));
        }
      }, 1000);
    }
  },
  updateNoteContent: (id, content) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, content } : note,
      ),
      activeNote:
        state.activeNote?.id === id
          ? { ...state.activeNote, content }
          : state.activeNote,
    }));
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      const { activeNote } = get();
      clearTimeout(syncTimer);
      syncTimer = setTimeout(async () => {
        try {
          if (activeNote)
            await updateNote({ noteId: activeNote.id, content: content });
        } catch (error) {
          const { setError } = useErrorStore.getState();
          setError(getErrorMessage(error));
        }
      }, 1000);
    }
  },
  updateNoteFolder: async (id, folder) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, folder } : note,
      ),
      activeNote:
        state.activeNote?.id === id
          ? { ...state.activeNote, folder }
          : state.activeNote,
      openedMenuNoteId: null,
    }));
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      const { activeNote } = get();
      try {
        if (activeNote)
          await updateNote({ noteId: activeNote.id, folder: folder });
      } catch (error) {
        const { setError } = useErrorStore.getState();
        setError(getErrorMessage(error));
      }
    }
  },
  addNote: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      try {
        const savedNote = await addNote({ title: "New Note", content: "" });
        set((state) => ({
          notes: [savedNote, ...state.notes],
          activeNote: savedNote,
        }));
        changeRoom(savedNote.id);
      } catch (error) {
        const { setError } = useErrorStore.getState();
        setError(getErrorMessage(error));
      }
      return;
    }
    const newNote: NoteResponseDto = {
      id: crypto.randomUUID(),
      title: "New Note",
      content: "",
      folder: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      notes: [newNote, ...state.notes],
      activeNote: newNote,
    }));
  },
  deleteNote: async (id) => {
    const notes = get().notes;
    const { setError } = useErrorStore.getState();
    if (!id) return;
    if (notes.length <= 1) {
      setError("You need at least one note");
      return;
    }
    set((state) => {
      const updatedNotes = state.notes.filter((note) => note.id !== id);
      let nextActiveNote = state.activeNote;
      if (nextActiveNote && nextActiveNote.id === id) {
        nextActiveNote = updatedNotes.length > 0 ? updatedNotes[0] : null;
      }
      return {
        notes: updatedNotes,
        activeNote: nextActiveNote,
      };
    });
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      try {
        await deleteNote(id);
      } catch (error) {
        const { setError } = useErrorStore.getState();
        setError(getErrorMessage(error));
      }
    }
  },
  clearNoteStore: () => {
    set({
      notes: [],
      activeNote: null,
    });
  },
}));
