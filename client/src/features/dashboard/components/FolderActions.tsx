import { FolderTree, List } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useFolderActions } from "../hooks/useFolderActions";

function FolderActions() {
  const { isFolderView, setFolderView } = useFolderActions();
  return (
    <div className="flex flex-row items-center justify-between w-full gap-1">
      <Button
        variant={!isFolderView ? "ghostTintedReversed" : "ghostTinted"}
        className="gap-2 p-2 rounded-md w-full flex items-center justify-center"
        onClick={() => setFolderView(false)}
      >
        <List className="w-4 h-4" />
        <span className="text-sm">All Notes</span>
      </Button>
      <Button
        variant={isFolderView ? "ghostTintedReversed" : "ghostTinted"}
        className="gap-2 p-2 rounded-md w-full items-center justify-center"
        onClick={async () => {
          setFolderView(true);
        }}
      >
        <FolderTree className="w-4 h-4" />
        <span className="text-sm">Folders</span>
      </Button>
    </div>
  );
}
export default FolderActions;
