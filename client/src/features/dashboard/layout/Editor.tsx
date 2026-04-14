import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TitleInput from "../components/TitleInput";
import EditorSurface from "../components/EditorSurface";
import EditorToolBar from "../components/EditorToolBar";
import { Placeholder } from "@tiptap/extensions";
import { useState } from "react";
function Editor({ className }: { className: string }) {
  const [title, setTitle] = useState("Untitled Note");
  const [tick, setTick] = useState(0);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing ...",
      }),
    ],
    autofocus: true,
    editorProps: {
      attributes: {
        class: "prose prose-p:text-xl focus:outline-none font-serif w-full",
      },
    },
    onTransaction: () => setTick(tick + 1),
  });
  return (
    <div className={`flex flex-col h-full w-full ${className}`}>
      <TitleInput value={title} onChange={setTitle}></TitleInput>
      <EditorToolBar editor={editor}></EditorToolBar>
      <EditorSurface editor={editor}></EditorSurface>
    </div>
  );
}
export default Editor;
