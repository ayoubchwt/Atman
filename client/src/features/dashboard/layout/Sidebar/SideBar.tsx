import { Plus, X } from "lucide-react";
import { useNotes } from "../../hooks/useNotes";
import { useUIStore } from "../../../../store/useUIStore";
import Button from "../../../../components/ui/Button";
import NoteList from "../../components/NoteList";
import SidebarActions from "../../components/SidebarActions";
import SearchInput from "../../../../components/ui/SearchInput";
import FolderActions from "../../components/FolderActions";
import FolderList from "../../components/FolderList";

function SideBar({ className }: { className?: string }) {
  const { handleAddNote, handleSearchByTitle } = useNotes();
  const { setSideBarOpen, isSideBarOpen } = useUIStore();
  return (
    <div
      className={`flex flex-col w-full p-4 h-full gap-5 bg-(--bg) overflow-auto ${className}`}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-sm text-(--text-light) font-semibold">NOTES</h1>
        <Button
          variant="ghostTinted"
          className=" flex items-center justify-center px-1 rounded-md"
          onClick={() => {
            handleAddNote();
            setSideBarOpen(false);
          }}
        >
          <Plus className="w-4 y-4"></Plus>
        </Button>
      </div>
      <FolderActions></FolderActions>
      <SearchInput onChange={handleSearchByTitle}></SearchInput>
      <FolderList></FolderList>
      <NoteList></NoteList>
      {!isSideBarOpen ? (
        <SidebarActions className="flex justify-between items-center w-full"></SidebarActions>
      ) : (
        <div className="flex justify-center items-center w-full">
          <Button variant="ghostTinted" onClick={() => setSideBarOpen(false)}>
            <X className="w-8 h-5"></X>
          </Button>
        </div>
      )}
    </div>
  );
}
export default SideBar;
