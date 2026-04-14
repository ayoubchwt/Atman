import InputField from "../ui/InputField";

function Input({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="font-semibold text-sm">{label}</label>
      <InputField type={type} placeholder={placeholder}></InputField>
    </div>
  );
}
export default Input;
