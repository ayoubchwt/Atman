import type { ReactNode } from "react";

function ShareUserIcon({
  letter,
  onClick,
}: {
  letter: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className="rounded-full p-1 bg-(--bg-dark) border border-(--item-light) w-7 h-7 flex items-center justify-center"
      onClick={onClick}
    >
      <h1 className="text-sm text-(--text)">{letter}</h1>
    </div>
  );
}
export default ShareUserIcon;
