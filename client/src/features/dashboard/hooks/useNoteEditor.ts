import { Placeholder } from "@tiptap/extensions";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

export const useNoteEditor = ({
  content,
  onUpdate,
}: {
  content: string;
  onUpdate: (html: string) => void;
}) => {
  const [tick, setTick] = useState(0);
  return useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing ...",
      }),
    ],
    autofocus: true,
    content: content,
    editorProps: {
      attributes: {
        class: "prose prose-p:text-xl focus:outline-none font-serif w-full",
      },
    },
    onTransaction: () => setTick(tick + 1),
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });
};
