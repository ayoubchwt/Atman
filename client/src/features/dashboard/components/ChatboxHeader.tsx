import { X } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useChatbox } from "../hooks/useChatbox";

function ChatboxHeader() {
  const { setChatboxOpen } = useChatbox();
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col justify-center">
        <h1 className="font-semibold text-(--text)">Atman AI</h1>
        <p className="text-sm text-(--text-light)">Context : Untitled Note</p>
      </div>
      <Button
        variant="ghost"
        className="p-2"
        onClick={() => setChatboxOpen(false)}
      >
        <X className="w-5 h-5"></X>
      </Button>
    </div>
  );
}
export default ChatboxHeader;
