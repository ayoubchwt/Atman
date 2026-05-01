import { useChatbox } from "../hooks/useChatbox";
import Message from "./Message";

function ChatboxBody() {
  const { messageList } = useChatbox();
  return (
    <div className="w-full h-full flex flex-col gap-3">
      {messageList.length === 0 && <p>no messages</p>}
      {messageList.map((message) => {
        return <Message>{message.text}</Message>;
      })}
    </div>
  );
}
export default ChatboxBody;
