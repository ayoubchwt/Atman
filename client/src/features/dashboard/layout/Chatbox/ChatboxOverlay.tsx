import Chatbox from "./Chatbox";

function ChatboxOverlay() {
  return (
    <div className="absolute w-full h-full z-11 justify-center items-center p-3 md:hidden">
      <Chatbox className="rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.6)]"></Chatbox>
    </div>
  );
}
export default ChatboxOverlay;
