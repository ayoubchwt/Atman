import { create } from "zustand";
import type { NoteResponseDto } from "../types/Note";
import {
  addNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../services/NoteService";
import { useAuthStore } from "./useAuthStore";

let syncTimer: ReturnType<typeof setTimeout>;

interface noteState {
  notes: NoteResponseDto[];
  activeNoteId: string | null;

  setNotes: (notes: NoteResponseDto[]) => void;
  fetchNotes: () => void;
  setActiveNote: (id: string | null) => void;
  updateNoteTitle: (id: string, title: string) => void;
  updateNoteContent: (id: string, content: string) => void;
  addNote: () => void;
  deleteNote: (id: string | null) => void;
  clearStore: () => void;
}
export const useNoteStore = create<noteState>((set) => ({
  notes: [],
  activeNoteId: null,
  setNotes: (notes) => set({ notes }),
  fetchNotes: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) return;
    try {
      const result = await getNotes();
      set({
        notes: result,
      });
    } catch (error) {
      console.log("error fetching notes", error);
    }
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
      isLocal: true,
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
  clearStore: () => {
    set({
      notes: [],
      activeNoteId: null,
    });
  },
}));
