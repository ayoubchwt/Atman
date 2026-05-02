import ChatboxBody from "../../components/ChatboxBody";
import ChatboxFooter from "../../components/ChatboxFooter";
import ChatboxHeader from "../../components/ChatboxHeader";

function Chatbox({ className }: { className: string }) {
  return (
    <div
      className={`flex flex-col h-full gap-2 bg-(--bg) p-4 border-l border-(--bg-dark) ${className}`}
    >
      <ChatboxHeader></ChatboxHeader>
      <ChatboxBody></ChatboxBody>
      <ChatboxFooter></ChatboxFooter>
    </div>
  );
}
export default Chatbox;
