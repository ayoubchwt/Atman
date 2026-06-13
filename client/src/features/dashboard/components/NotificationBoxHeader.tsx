import { useShareNote } from "../hooks/useShareNote";

function NotificationBoxHeader() {
  const { inviteNotifications } = useShareNote();
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <h1 className="text-md text-(--text) font-semibold font-serif">
        Notification
      </h1>
      <h1 className="text-xs text-(--text-light)">
        {inviteNotifications.length} New
      </h1>
    </div>
  );
}
export default NotificationBoxHeader;
