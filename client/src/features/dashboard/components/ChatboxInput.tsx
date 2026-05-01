import { ArrowUp } from "lucide-react";
import Button from "../../../components/ui/Button";

function ChatboxInput() {
  return (
    <div className="flex items-center justify-between py-1.5 px-2 gap-3 border border-(--bg-dark) text-(--text) rounded-md bg-(--bg-light) w-full">
      <input
        type="text"
        className="w-full h-full outline-0 text-sm"
        placeholder="Ask for anything ..."
      />
      <Button variant="dark" className="rounded-full p-2">
        <ArrowUp className="w-4 h-4" />
      </Button>
    </div>
  );
}
export default ChatboxInput;
