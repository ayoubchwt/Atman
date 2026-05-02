import { useChatbox } from "../hooks/useChatbox";
import ChatboxOption from "./ChatboxOption";

function ChatboxStarter() {
  const { handleSendMessage } = useChatbox();
  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-25 pt-15">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="font-serif text-xl text-(--text) font-semibold">
          How can I help?
        </h1>
        <p className="text-sm text-(--text-light) text-center">
          I can answer questions about your note or help you write.
        </p>
      </div>
      <div className="flex flex-col justify-center w-full gap-4">
        <ChatboxOption onClick={handleSendMessage}>
          Summarize this note
        </ChatboxOption>
        <ChatboxOption onClick={handleSendMessage}>
          Improve the writing
        </ChatboxOption>
        <ChatboxOption onClick={handleSendMessage}>
          Expand on the main idea
        </ChatboxOption>
        <ChatboxOption onClick={handleSendMessage}>
          Find the key Takeways
        </ChatboxOption>
      </div>
    </div>
  );
}
export default ChatboxStarter;
