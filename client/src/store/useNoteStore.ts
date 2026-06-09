import { create } from "zustand";
import type { NoteResponseDto } from "../types/Note";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
  getNotesByTitle,
} from "../services/NoteService";
import { useAuthStore } from "./useAuthStore";
import { useErrorStore } from "./useErrorStore";
import { getErrorMessage } from "../utils/getError";
import { useShareStore } from "./useShareStore";
import socket from "../api/Socket";

let syncTimer: ReturnType<typeof setTimeout>;
interface NoteState {
  notes: NoteResponseDto[];
  activeNoteId: string | null;
  activeNoteType: "owned" | "shared";
  openedMenuNoteId: string | null;
  getActiveNote: () => NoteResponseDto;
  fetchNotes: () => void;
  searchNotes: (search: string) => void;
  setActiveNote: (id: string | null) => void;
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
  activeNoteId: null,
  activeNoteType: "owned",
  openedMenuNoteId: null,
  getActiveNote: (): NoteResponseDto => {
    const { activeNoteId, notes } = get();
    return notes.find((note) => note.id === activeNoteId)!;
  },
  fetchNotes: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) return;
    try {
      const result = await getNotes();
      set({
        activeNoteId: result[0].id,
        notes: result,
      });
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
        set({
          notes: result,
        });
      } catch (error) {
        const { setError } = useErrorStore.getState();
        setError(getErrorMessage(error));
      }
    }, 200);
  },
  setActiveNote: (id) => {
    if (!id) return;
    const activeNoteType = get().activeNoteType;
    set({ activeNoteId: id });
    if (activeNoteType === "shared") {
      const sendJoingEmit = () => {
        console.log("connected successfully", socket.id);
        console.log("joining the room for id :", id);
        socket.emit("join-note-room", id);
      };
      socket.on("connect_error", (err) => {
        console.error("❌ SOCKET HANDSHAKE ERROR DETECTED:", err.message);
        console.log("Context Details:", err);
      });
      if (!socket.connected) {
        console.log(
          "socket is offline .Setting up liteners and connecting ...",
        );
        socket.once("connect", sendJoingEmit);
        socket.connect();
      } else {
        sendJoingEmit();
      }
      console.log("Room joining process completed");
    }
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
      }));
    }
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      const { activeNoteId } = get();
      clearTimeout(syncTimer);
      syncTimer = setTimeout(async () => {
        try {
          if (activeNoteId)
            await updateNote({ noteId: activeNoteId, title: title });
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
    }));
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      const { activeNoteId } = get();
      clearTimeout(syncTimer);
      syncTimer = setTimeout(async () => {
        try {
          if (activeNoteId)
            await updateNote({ noteId: activeNoteId, content: content });
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
      openedMenuNoteId: null,
    }));
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      const { activeNoteId } = get();
      try {
        if (activeNoteId)
          await updateNote({ noteId: activeNoteId, folder: folder });
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
          activeNoteId: savedNote.id,
        }));
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
      activeNoteId: newNote.id,
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
      let nextActiveNote = state.activeNoteId;
      if (nextActiveNote === id) {
        nextActiveNote = updatedNotes.length > 0 ? updatedNotes[0].id : null;
      }
      return {
        notes: updatedNotes,
        activeNoteId: nextActiveNote,
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
      activeNoteId: null,
    });
  },
}));
