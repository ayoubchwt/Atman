function TitleInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="w-full p-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Untitled Note"
        className="w-full bg-transparent border-none outline-none text-4xl text-(--text) font-serif"
      />
    </div>
  );
}
export default TitleInput;
