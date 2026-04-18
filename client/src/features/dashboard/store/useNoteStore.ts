import { create } from "zustand";
import type { CreateNoteDto, NoteResponseDto } from "../../../types/Note";

interface noteState {
  notes: NoteResponseDto[];
  activeNoteId: string | null;
  setNotes: (notes: NoteResponseDto[]) => void;
  setActiveNote: (id: string | null) => void;
  updateNoteTitle: (id: string, title: string) => void;
  updateNoteContent: (id: string, content: string) => void;
  addNote: (note: CreateNoteDto) => void;
  deleteNote: (id: string | null) => void;
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
  addNote: (note) =>
    set((state) => {
      const newNote: NoteResponseDto = {
        ...note,
        id: crypto.randomUUID(),
        tags: note.tags ?? [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        notes: [newNote, ...state.notes],
        activeNoteId: newNote.id,
      };
    }),
  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
  },
}));
