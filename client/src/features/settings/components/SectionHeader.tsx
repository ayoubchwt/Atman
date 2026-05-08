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
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        {icon}
        <h1 className="text-xl">{title}</h1>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
}
export default SectionHeader;
