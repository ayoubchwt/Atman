import type { ReactNode } from "react";

function SectionHeader({
  title,
  icon,
  description,
}: {
  title: string;
  icon: ReactNode;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 text-(--text)">
        {icon}
        <h1 className="text-xl font-semibold text-(--text)">{title}</h1>
      </div>
      <p className="text-sm text-(--text-light)">{description}</p>
    </div>
  );
}
export default SectionHeader;
