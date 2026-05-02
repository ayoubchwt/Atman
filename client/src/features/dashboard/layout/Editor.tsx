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
import { useChatbox } from "../hooks/useChatbox";
import ChatboxOverlay from "./Chatbox/ChatboxOverlay";
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
      {isSideBarOpen && <SidebarOverlay></SidebarOverlay>}
      {isTimerOpen && <Timer></Timer>}
      {isChatboxOpen && <ChatboxOverlay></ChatboxOverlay>}
      {!isSideBarOpen && (
        <Button
          variant="dark"
          onClick={() => setSideBarOpen(true)}
          className="absolute md:hidden bottom-4 left-4 p-2 rounded-full shadow-xl z-10"
        >
          <LibraryBig />
        </Button>
      )}
      {!isTimerOpen && (
        <Button
          variant="dark"
          className={`absolute right-4 bottom-4 p-2 rounded-full shadow-xl h-10 z-10 ${isRunning ? "w-17" : "w-10"}`}
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
