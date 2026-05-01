import type { ReactNode } from "react";

function Message({ children }: { children: ReactNode }) {
  return <div className="w-full p-2 bg-(--bg-dark)">{children}</div>;
}
export default Message;
