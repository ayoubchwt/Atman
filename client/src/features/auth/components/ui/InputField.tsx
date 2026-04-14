import type { ChangeEvent } from "react";

function InputField({
  type,
  placeholder,
  onChange,
}: {
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="border border-(--text-light) rounded-md px-2 py-2 w-full outline-none text-sm"
    ></input>
  );
}
export default InputField;
