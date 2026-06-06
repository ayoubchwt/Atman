import { Placeholder } from "@tiptap/extensions";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useNotes } from "./useNotes";
import { useShareStore } from "../../../store/useShareStore";

export const useNoteEditor = () => {
  const [tick, setTick] = useState(0);
  const { notes, activeNoteId, handleUpdateContent } = useNotes();
  const { activeSharedNoteId, sharedNotes } = useShareStore();
  const activeNote = notes.find((note) => note.id === activeNoteId);
  const sharedActiveNote = sharedNotes.find(
    (note) => note.id === activeSharedNoteId,
  );
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing ...",
      }),
    ],
    autofocus: true,
    content: activeNote?.content ?? "",
    editorProps: {
      attributes: {
        class:
          "prose prose-p:text-xl prose-headings:text-(--text) prose-blockquote:text-(--text) prose-strong:text-(--text) focus:outline-none max-w-none font-serif w-full text-(--text)",
      },
    },
    onTransaction: () => {
      setTick(tick + 1);
    },
    onUpdate: ({ editor }) => {
      if (activeNoteId) handleUpdateContent(activeNoteId, editor.getHTML());
    },
  });
  useEffect(() => {
    if (!editor) return;
    if (!activeNote) {
      editor.commands.clearContent();
      return;
    }
    if (editor.getHTML() === activeNote.content) return;
    editor.commands.setContent(activeNote.content);
  }, [activeNote, editor]);
  useEffect(() => {
    if (!editor) return;
    if (!sharedActiveNote) {
      editor.commands.clearContent();
      return;
    }
    if (editor.getHTML() === sharedActiveNote.content) return;
    editor.commands.setContent(sharedActiveNote.content);
  }, [sharedActiveNote, editor]);
  return editor;
};
