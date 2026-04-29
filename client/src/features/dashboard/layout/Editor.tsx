import TitleInput from "../components/TitleInput";
import EditorSurface from "../components/EditorSurface";
import EditorToolBar from "../components/EditorToolBar";
import { useNoteEditor } from "../hooks/useNoteEditor";
import Button from "../../../components/ui/Button";
import { ClockFading, LibraryBig } from "lucide-react";
import SidebarOverlay from "./Sidebar/SidebarOverlay";
import { useUIStore } from "../../../store/useUIStore";
import Timer from "./Timer";
import { useTimer } from "../hooks/useTimer";
function Editor({ className }: { className?: string }) {
  const editor = useNoteEditor();
  const { isSideBarOpen, setSideBarOpen } = useUIStore();
  const { setTimerOpen, isTimerOpen } = useTimer();
  return (
    <div className={`relative flex flex-col h-full w-full ${className}`}>
      <TitleInput></TitleInput>
      <EditorToolBar editor={editor}></EditorToolBar>
      <EditorSurface editor={editor}></EditorSurface>
      <SidebarOverlay isOpen={isSideBarOpen}></SidebarOverlay>
      {isTimerOpen && <Timer></Timer>}
      {!isSideBarOpen && (
        <Button
          variant="dark"
          onClick={() => setSideBarOpen(true)}
          className="absolute md:hidden bottom-4 left-4 p-2 rounded-full shadow-xl"
        >
          <LibraryBig />
        </Button>
      )}

      {!isTimerOpen && (
        <Button
          variant="dark"
          className="absolute bottom-4 right-4 p-2 rounded-full shadow-xl"
          onClick={() => setTimerOpen(true)}
        >
          <ClockFading />
        </Button>
      )}
    </div>
  );
}
export default Editor;
