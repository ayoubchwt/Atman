function TitleInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="w-full py-2 px-5">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Untitled Note"
        className="w-full bg-transparent border-none outline-none font-semibold text-3xl text-(--text) font-serif"
      />
    </div>
  );
}
export default TitleInput;
