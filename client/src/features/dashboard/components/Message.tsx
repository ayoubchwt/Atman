import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
function Message({ children, sender }: { children: string; sender: string }) {
  return (
    <div
      className={`w-full p-2 text-sm rounded-md ${sender === "user" ? "bg-(--bg-dark)" : "bg-(--bg)"}`}
    >
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
      </div>
    </div>
  );
}
export default Message;
