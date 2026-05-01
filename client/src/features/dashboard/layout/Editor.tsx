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
import Chatbox from "./Chatbox";
import { useChatbox } from "../hooks/useChatbox";
function Editor({ className }: { className?: string }) {
  const editor = useNoteEditor();
  const { isSideBarOpen, setSideBarOpen } = useUIStore();
  const { setTimerOpen, isTimerOpen, isRunning, formatTime } = useTimer();
  const { isChatboxOpen } = useChatbox();
  return (
    <div className={`relative flex flex-col h-full w-full ${className}`}>
      <TitleInput></TitleInput>
      <EditorToolBar editor={editor}></EditorToolBar>
      <EditorSurface editor={editor}></EditorSurface>
      <SidebarOverlay isOpen={isSideBarOpen}></SidebarOverlay>
      <div className="absolute flex bottom-0 right-0 display h-full items-end z-10">
        {!isTimerOpen && (
          <Button
            variant="dark"
            className={`mb-4 mr-4 p-2 rounded-full shadow-xl h-10 ${isRunning ? "w-17" : "w-10"}`}
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
        {isTimerOpen && <Timer></Timer>}
        {isChatboxOpen && <Chatbox></Chatbox>}
      </div>
      {!isSideBarOpen && (
        <Button
          variant="dark"
          onClick={() => setSideBarOpen(true)}
          className="absolute md:hidden bottom-4 left-4 p-2 rounded-full shadow-xl"
        >
          <LibraryBig />
        </Button>
      )}
    </div>
  );
}
export default Editor;
