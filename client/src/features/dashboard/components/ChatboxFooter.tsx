import ChatboxInput from "./ChatboxInput";

function ChatboxFooter() {
  return (
    <div className="flex flex-col justify-between w-full gap-2">
      <ChatboxInput></ChatboxInput>
      <p className="w-full text-center text-(--text-light) text-xs">
        AI can make mistakes. Verify important info.
      </p>
    </div>
  );
}
export default ChatboxFooter;
