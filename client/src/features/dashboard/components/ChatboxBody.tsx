import { useChatbox } from "../hooks/useChatbox";
import ChatboxStarter from "./ChatboxStarter";
import Message from "./Message";

function ChatboxBody() {
  const { messageList } = useChatbox();
  return (
    <div className="w-full h-full flex flex-col gap-3">
      {messageList.length === 0 && <ChatboxStarter></ChatboxStarter>}
      {messageList.map((message) => {
        return <Message sender={message.sender}>{message.text}</Message>;
      })}
    </div>
  );
}
export default ChatboxBody;
