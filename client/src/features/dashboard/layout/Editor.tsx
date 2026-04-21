import TitleInput from "../components/TitleInput";
import EditorSurface from "../components/EditorSurface";
import EditorToolBar from "../components/EditorToolBar";
import { useNoteEditor } from "../hooks/useNoteEditor";
import Button from "../../../components/ui/Button";
import { LibraryBig } from "lucide-react";
import SidebarOverlay from "./Sidebar/SidebarOverlay";
import { useUIStore } from "../../../store/useUIStore";
function Editor({ className }: { className?: string }) {
  const editor = useNoteEditor();
  const { isSideBarOpen, setSideBarOpen } = useUIStore();
  return (
    <div className={`relative flex flex-col h-full w-full ${className}`}>
      <TitleInput></TitleInput>
      <EditorToolBar editor={editor}></EditorToolBar>
      <EditorSurface editor={editor}></EditorSurface>
      <SidebarOverlay isOpen={isSideBarOpen}></SidebarOverlay>
      {!isSideBarOpen && (
        <Button
          variant="dark"
          onClick={() => setSideBarOpen(true)}
          className="absolute md:hidden bottom-4 left-4 p-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
        >
          <LibraryBig />
        </Button>
      )}
    </div>
  );
}
export default Editor;
