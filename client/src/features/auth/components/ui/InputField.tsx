function InputField({
  type,
  placeholder,
}: {
  type: string;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="border border-(--text-light) rounded-md px-2 py-2 w-full outline-none text-sm"
    ></input>
  );
}
export default InputField;
