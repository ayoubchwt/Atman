import type { ReactNode } from "react";

function ShareUserIcon({
  letter,
  onClick,
  className,
}: {
  letter: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full bg-(--bg-dark) border border-(--item-light) flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      <h1 className="text-sm text-(--text)">{letter}</h1>
    </div>
  );
}
export default ShareUserIcon;
