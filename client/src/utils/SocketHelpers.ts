import socket from "../api/Socket";
import { useErrorStore } from "../store/useErrorStore";
import { useNoteStore } from "../store/useNoteStore";
import { useShareStore } from "../store/useShareStore";
import type { NoteResponseDto } from "../types/Note";
import { getErrorMessage } from "./getError";

export const changeRoom = (noteId: string) => {
  if (!socket.connected) {
    socket.connect();
    socket.once("connect", () => {
      socket.emit("join-note-room", noteId);
    });
    const { setError } = useErrorStore.getState();
    socket.once("connect_error", (error: Error) => {
      setError(getErrorMessage(error));
    });
    return;
  }
  socket.emit("join-note-room", noteId);
};
export const listentToUpdate = () => {
  socket.off("note-updated");
  socket.on("note-updated", (updatedNote: NoteResponseDto) => {
    if (!updatedNote.id) return;
    const { activeNoteType, setActiveNote, activeNote } =
      useNoteStore.getState();
    if (activeNoteType === "shared") {
      useShareStore.setState((state) => ({
        sharedNotes: state.sharedNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note,
        ),
      }));
    } else {
      useNoteStore.setState((state) => ({
        notes: state.notes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note,
        ),
      }));
    }
    if (activeNote?.id === updatedNote.id) {
      setActiveNote(updatedNote);
    }
  });
};
