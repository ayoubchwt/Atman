import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TitleInput from "./TitleInput";
import EditorSurface from "./EditorSurface";
import EditorToolBar from "./EditorToolBar";
import { useState } from "react";
function Editor() {
  const [title, setTitle] = useState("Untitled Note");
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p> Start writing your masterpiece... </p>",
  });
  return (
    <div className="flex flex-col h-full w-full">
      <TitleInput value={title} onChange={setTitle}></TitleInput>
      <EditorToolBar editor={editor}></EditorToolBar>
      <EditorSurface editor={editor}></EditorSurface>
    </div>
  );
}
export default Editor;
