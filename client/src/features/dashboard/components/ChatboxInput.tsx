import { ArrowUp } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useChatbox } from "../hooks/useChatbox";

function ChatboxInput() {
  const { prompt, setPrompt, handleSendMessage } = useChatbox();
  return (
    <div className="flex items-center justify-between p-2.5 gap-3 border border-(--bg-dark) text-(--text) rounded-md bg-(--bg-light) w-full">
      <input
        type="text"
        value={prompt}
        className="w-full h-full outline-0 text-sm"
        placeholder="Ask for anything ..."
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <Button
        variant="dark"
        className="rounded-full p-1"
        onClick={() => handleSendMessage()}
        disabled={!prompt.trim()}
      >
        <ArrowUp className="w-4 h-4" />
      </Button>
    </div>
  );
}
export default ChatboxInput;
