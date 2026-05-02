import { PanelRightClose } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useChatbox } from "../hooks/useChatbox";
import { useNoteStore } from "../../../store/useNoteStore";

function ChatboxHeader() {
  const { setChatboxOpen } = useChatbox();
  const { getActiveNote } = useNoteStore();
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col justify-center">
        <p className="text-sm text-(--text-light)">
          Context : {getActiveNote()?.title || "No Note Selected"}
        </p>
      </div>
      <Button
        variant="ghost"
        className="p-2"
        onClick={() => setChatboxOpen(false)}
      >
        <PanelRightClose className="w-5 h-5"></PanelRightClose>
      </Button>
    </div>
  );
}
export default ChatboxHeader;
