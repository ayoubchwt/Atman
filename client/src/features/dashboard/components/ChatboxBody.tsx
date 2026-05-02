import { useEffect, useRef } from "react";
import { useChatbox } from "../hooks/useChatbox";
import ChatboxGenerating from "./ChatboxGenerating";
import ChatboxStarter from "./ChatboxStarter";
import Message from "./Message";

function ChatboxBody() {
  const { messageList, isLoading } = useChatbox();
  const anchor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    anchor.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList, isLoading]);
  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-auto scrollbar-hide min-h-0">
      {messageList.length === 0 && <ChatboxStarter></ChatboxStarter>}
      {messageList.map((message) => {
        return (
          <Message key={message.id} sender={message.sender}>
            {message.text}
          </Message>
        );
      })}
      {isLoading && <ChatboxGenerating></ChatboxGenerating>}
      <div ref={anchor} className="h-px"></div>
    </div>
  );
}
export default ChatboxBody;
