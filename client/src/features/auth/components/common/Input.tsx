import InputField from "../ui/InputField";

function Input({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label>{label}</label>
      <InputField type={type}></InputField>
    </div>
  );
}
export default Input;
