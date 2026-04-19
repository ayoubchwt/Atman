import { Placeholder } from "@tiptap/extensions";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { useNotes } from "./useNotes";

export const useNoteEditor = () => {
  const [tick, setTick] = useState(0);
  const { notes, activeNoteId, handleUpdateContent } = useNotes();
  const activeNote = notes.find((note) => note.id === activeNoteId);
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
        class: "prose prose-p:text-xl focus:outline-none font-serif w-full",
      },
    },
    onTransaction: () => setTick(tick + 1),
    onUpdate: ({ editor }) => {
      if (activeNoteId) handleUpdateContent(activeNoteId, editor.getHTML());
    },
  });
  useEffect(() => {
    if (!editor || !activeNote) return;
    if (editor.getHTML() === activeNote.content) return;
    editor.commands.setContent(activeNote.content);
  }, [activeNote, editor]);
  return editor;
};
