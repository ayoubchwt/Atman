import { create } from "zustand";
import type { NoteResponseDto } from "../../../types/Note";

interface noteState {
  notes: NoteResponseDto[];
  activeNoteId: string | null;
  setNotes: (notes: NoteResponseDto[]) => void;
  setActiveNote: (id: string | null) => void;
  updateNoteTitle: (id: string, title: string) => void;
  updateNoteContent: (id: string, content: string) => void;
  addNote: () => void;
  deleteNote: (id: string | null) => void;
  replaceNote: (id: string | null, createNoteDto: NoteResponseDto) => void;
}
export const useNoteStore = create<noteState>((set) => ({
  notes: [],
  activeNoteId: null,
  setNotes: (notes) => set({ notes }),
  setActiveNote: (id) => set({ activeNoteId: id }),
  updateNoteTitle: (id, title) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, title } : note,
      ),
    })),
  updateNoteContent: (id, content) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, content } : note,
      ),
    })),
  addNote: () =>
    set((state) => {
      const newNote: NoteResponseDto = {
        id: crypto.randomUUID(),
        title: "",
        content: "",
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isLocal: true,
      };
      return {
        notes: [newNote, ...state.notes],
        activeNoteId: newNote.id,
      };
    }),
  deleteNote: (id) => {
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
  },
  replaceNote: (id, data) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...data } : note,
      ),
      activeNoteId: state.activeNoteId === id ? data.id : state.activeNoteId,
    }));
  },
}));
