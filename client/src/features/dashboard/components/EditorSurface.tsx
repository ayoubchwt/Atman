import { Editor, EditorContent } from "@tiptap/react";
function EditorSurface({ editor }: { editor: Editor | null }) {
  if (!editor) return <></>;
  return (
    <div className="overflow-y-auto px-5 py-5 bg-(--bg-light) w-full">
      <EditorContent editor={editor}></EditorContent>
    </div>
  );
}
export default EditorSurface;
