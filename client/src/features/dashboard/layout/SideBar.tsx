import Button from "../../../components/ui/Button";
import { Plus } from "lucide-react";
import NoteList from "../components/NoteList";
import { useNotes } from "../hooks/useNotes";
import SidebarActions from "../components/SidebarActions";
function SideBar({ className }: { className?: string }) {
  const { handleAddNote } = useNotes();
  const onAddNote = () => {
    handleAddNote();
  };
  return (
    <div
      className={`flex flex-col w-full p-4 h-full gap-5 bg-(--bg) overflow-auto ${className}`}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-sm text-(--text-light) font-semibold">NOTES</h1>
        <Button
          variant="ghostTinted"
          className=" flex items-center justify-center px-1"
          onClick={onAddNote}
        >
          <Plus className="w-4 y-4"></Plus>
        </Button>
      </div>

      <NoteList></NoteList>
      <SidebarActions></SidebarActions>
    </div>
  );
}
export default SideBar;
