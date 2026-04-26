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

let syncTimer: ReturnType<typeof setTimeout>;

interface noteState {
  notes: NoteResponseDto[];
  activeNoteId: string | null;
  fetchNotes: () => void;
  searchNotes: (search: string) => void;
  setActiveNote: (id: string | null) => void;
  updateNoteTitle: (id: string, title: string) => void;
  updateNoteContent: (id: string, content: string) => void;
  addNote: () => void;
  deleteNote: (id: string | null) => void;
  clearNoteStore: () => void;
}
export const useNoteStore = create<noteState>((set) => ({
  notes: [],
  activeNoteId: null,
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
      console.log("error fetching notes", error);
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
        console.log("error searching notes", error);
      }
    }, 200);
  },
  setActiveNote: (id) => set({ activeNoteId: id }),

  updateNoteTitle: (id, title) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, title } : note,
      ),
    }));
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      clearTimeout(syncTimer);
      syncTimer = setTimeout(async () => {
        try {
          await updateNote(id, { title });
        } catch (error) {
          console.log("error updaiting title", error);
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
      clearTimeout(syncTimer);
      syncTimer = setTimeout(async () => {
        try {
          await updateNote(id, { content });
        } catch (error) {
          console.log("error updating content", error);
        }
      }, 1000);
    }
  },
  addNote: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      try {
        const savedNote = await addNote({ title: "New Notes", content: "" });
        set((state) => ({
          notes: [savedNote, ...state.notes],
          activeNoteId: savedNote.id,
        }));
        return;
      } catch (error) {
        console.log("error adding note", error);
        return;
      }
    }
    const newNote: NoteResponseDto = {
      id: crypto.randomUUID(),
      title: "New Note",
      content: "",
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      notes: [newNote, ...state.notes],
      activeNoteId: newNote.id,
    }));
  },
  deleteNote: async (id) => {
    if (!id) return;
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
        console.log("error deleting note", error);
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
