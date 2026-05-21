import { Check, FileText, X } from "lucide-react";
import ShareUserIcon from "./ShareUserIcon";
import Button from "../../../components/ui/Button";

function NotificationItem({
  letter,
  name,
  role,
  noteTitle,
  createdAt,
}: {
  letter: string;
  name: string;
  role: string;
  noteTitle: string;
  createdAt: string;
}) {
  return (
    <div className="flex">
      <ShareUserIcon letter={letter} />
      <div className="flex flex-col">
        <p className="text-sm text-(text-light)">
          <span className="text-sm text-(--text) font-semibold">{name}</span>
          invited you as{" "}
          <span className="text-sm text-(--text) font-semibold">{role}</span>
        </p>
        <div className="flex items-center gap-1">
          <FileText className="w-4 h-4 text-(--text-light)" />
          <p className="text-sm text-(--text-light)">{noteTitle}</p>
          <p className="text-xs text-(--text-light)">{createdAt}</p>
        </div>
        <div className="flex items-center">
          <Button variant="dark">
            <Check className="w-4 h-4" />
            Accept
          </Button>
          <Button variant="ghostTinted">
            <X className="w-4 h-4" />
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
export default NotificationItem;
