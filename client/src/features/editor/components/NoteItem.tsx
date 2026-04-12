import type { ReactNode } from "react";
import { FileText, Trash2 } from "lucide-react";
function NoteItem({ children }: { children: ReactNode }) {
  return (
    <div className="py-2 px-2 flex gap-2 items-center justify-between w-full rounded-md cursor-pointer group bg-(--bg-dark)">
      <div className="flex gap-2 items-center">
        <FileText className="w-4 h-4"></FileText>
        <span className="text-sm">{children}</span>
      </div>
      <button className="hidden group-hover:block bg-(--ghostTinted) text-(--text-light) hover:text-(--text) cursor-pointer px-1">
        <Trash2 className="w-3.5 h-3.5"></Trash2>
      </button>
    </div>
  );
}
export default NoteItem;
