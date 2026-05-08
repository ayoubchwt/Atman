import type { ChangeEvent } from "react";
import InputField from "../../../components/ui/InputField";

function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-semibold text-sm text-(--text)">{label}</label>
      <InputField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></InputField>
    </div>
  );
}
export default Input;
