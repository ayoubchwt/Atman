function ChatboxOption({
  children,
  onClick,
}: {
  children: string;
  onClick: (text: string) => void;
}) {
  return (
    <div
      className="text-sm text-(--text) border border-(--bg-dark) p-2 rounded-md hover:bg-(--bg-dark) cursor-pointer"
      onClick={() => onClick(children)}
    >
      {children}
    </div>
  );
}
export default ChatboxOption;
