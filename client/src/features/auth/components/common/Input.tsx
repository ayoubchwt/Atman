import type { ChangeEvent } from "react";
import InputField from "../ui/InputField";

function Input({
  label,
  type,
  placeholder,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-semibold text-sm">{label}</label>
      <InputField
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      ></InputField>
    </div>
  );
}
export default Input;
