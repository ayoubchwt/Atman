function ChatboxGenerating() {
  return (
    <div className="flex items-center gap-1.5 p-3 rounded-lg bg-(--item-light) w-fit">
      <div className="w-1.5 h-1.5 rounded-full bg-(--text-light) animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-(--text-light) animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-(--text-light) animate-bounce"></div>
    </div>
  );
}
export default ChatboxGenerating;
