import { Forward } from "lucide-react";
import Button from "../../../components/ui/Button";
import ShareUsersList from "./ShareUsersIconList";
import { useUIStore } from "../../../store/useUIStore";
import { useShareNote } from "../hooks/useShareNote";

function ShareBox() {
  const { setShareOpen } = useUIStore();
  const { fetchCollaboratorsAndInvites } = useShareNote();
  return (
    <div className="flex items-center justify-center gap-3">
      <ShareUsersList></ShareUsersList>
      <Button
        variant="dark"
        className="rounded-md p-2 gap-1"
        onClick={() => {
          fetchCollaboratorsAndInvites();
          setShareOpen(true);
        }}
      >
        <Forward className="w-4 h-4" />
        Share
      </Button>
    </div>
  );
}
export default ShareBox;
