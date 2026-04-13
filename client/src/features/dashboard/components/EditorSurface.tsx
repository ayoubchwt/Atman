import { Editor, EditorContent } from "@tiptap/react";
function EditorSurface({ editor }: { editor: Editor }) {
  return (
    <div className="overflow-y-auto p-5 bg-(--bg-light)">
      <EditorContent editor={editor} className="prose"></EditorContent>
    </div>
  );
}
export default EditorSurface;
