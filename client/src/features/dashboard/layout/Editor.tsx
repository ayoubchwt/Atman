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
  const { setTimerOpen, isTimerOpen, isRunning, formatTime } = useTimer();
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
          className={`absolute bottom-4 right-4 p-2 rounded-full shadow-xl h-10 ${isRunning ? "w-17" : "w-10"}`}
          onClick={() => setTimerOpen(true)}
        >
          {isRunning ? (
            <h1 className="text-xl font-serif text-(--bg)">
              {formatTime().minutes}:{formatTime().seconds}
            </h1>
          ) : (
            <ClockFading />
          )}
        </Button>
      )}
    </div>
  );
}
export default Editor;
