import { Search } from "lucide-react";

function SearchInput({ onChange }: { onChange: (e: string) => void }) {
  return (
    <div className="flex items-center justify-between py-1.5 px-2 gap-3 border border-(--bg-dark) text-(--text) rounded-md bg-(--bg-light)">
      <Search className="w-4 h-4" />
      <input
        type="text"
        className="w-full h-full outline-0 text-sm"
        placeholder="Search for notes ..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
export default SearchInput;
