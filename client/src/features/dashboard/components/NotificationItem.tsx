import { Check, FileText, X } from "lucide-react";
import ShareUserIcon from "./ShareUserIcon";
import Button from "../../../components/ui/Button";

function NotificationItem({
  letter,
  name,
  role,
  noteTitle,
  createdAt,
  onAccept,
  onDecline,
}: {
  letter: string;
  name: string;
  role: string;
  noteTitle: string;
  createdAt: string;
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-(--bg-dark) px-1 py-2 hover:bg-(--item-light)">
      <ShareUserIcon letter={letter} className="w-10 h-10" />
      <div className="flex flex-col gap-1">
        <p className="text-sm text-(--text-light)">
          <span className="text-sm text-(--text) font-semibold">{name}</span>{" "}
          invited you as{" "}
          <span className="text-sm text-(--text) font-semibold">{role}</span>
        </p>
        <div className="flex items-center gap-1">
          <FileText className="w-3 h-3 text-(--text-light)" />
          <p className="text-xs text-(--text-light)">{noteTitle}</p>
          <p className="text-xs text-(--text-light)">{createdAt}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="dark"
            className="p-1.5 rounded-md"
            onClick={onAccept}
          >
            <Check className="w-4 h-4" />
            Accept
          </Button>
          <Button
            variant="ghostTinted"
            className="p-1.5 rounded-md"
            onClick={onDecline}
          >
            <X className="w-4 h-4" />
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
export default NotificationItem;
