import TitleInput from "../components/TitleInput";
import EditorSurface from "../components/EditorSurface";
import EditorToolBar from "../components/EditorToolBar";
import { useNotes } from "../hooks/useNotes";
import { useNoteEditor } from "../hooks/useNoteEditor";
function Editor({ className }: { className?: string }) {
  const { notes, activeNoteId, handleUpdateContent } = useNotes();
  const activeNote = notes.find((note) => note.id === activeNoteId);
  const inialContent = activeNote?.content ?? "";
  const editor = useNoteEditor({
    content: inialContent,
    onUpdate: (html) => {
      if (activeNoteId) handleUpdateContent(activeNoteId, html);
    },
  });
  return (
    <div className={`flex flex-col h-full w-full ${className}`}>
      <TitleInput></TitleInput>
      <EditorToolBar editor={editor}></EditorToolBar>
      <EditorSurface editor={editor}></EditorSurface>
    </div>
  );
}
export default Editor;
