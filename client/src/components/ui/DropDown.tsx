import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export interface DropDownOption {
  label: string;
  value: string;
}
function DropDown({
  options,
  setValue,
  value,
  className,
}: {
  options: DropDownOption[];
  setValue: (value: string) => void;
  value: string;
  className: string;
}) {
  const selectedOption = options.find((option) => option.value === value);
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      className={`relative flex px-3 rounded-md items-center justify-between border border-(--text-light) cursor-pointer ${className}`}
      onClick={() => setOpen(!isOpen)}
    >
      <h1 className="text-sm text-(--text)">{selectedOption?.label}</h1>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-(--text-light)" />
      ) : (
        <ChevronDown className="w-5 h-5 text-(--text-light)" />
      )}

      {isOpen && (
        <div className="absolute -left-px -right-px top-full z-101 mt-1 flex flex-col p-1 rounded-md gap-2 shadow-md bg-(--bg-light)">
          {options?.map((option) => {
            return (
              <>
                <div
                  className={`flex items-center rounded-md p-2 ${option === selectedOption && "bg-(--bg-dark)"}`}
                  onClick={() => setValue(option.value)}
                >
                  <span className="text-sm text-(--text)">{option.label}</span>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default DropDown;
