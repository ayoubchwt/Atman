import ChatboxBody from "../components/ChatboxBody";
import ChatboxFooter from "../components/ChatboxFooter";
import ChatboxHeader from "../components/ChatboxHeader";

function Chatbox() {
  return (
    <div className="flex flex-col justify-center gap-2 bg-(--bg) w-110 h-full p-4 border-l border-(--bg-dark)">
      <ChatboxHeader></ChatboxHeader>
      <ChatboxBody></ChatboxBody>
      <ChatboxFooter></ChatboxFooter>
    </div>
  );
}
export default Chatbox;
