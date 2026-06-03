import { useShareNote } from "../hooks/useShareNote";
import NotificationItem from "./NotificationItem";

function NotificationBoxBody() {
  const { inviteNotifications } = useShareNote();
  return (
    <div className="flex flex-1 min-h-0 overflow-auto scrollbar-hide flex-col w-full p-3">
      {inviteNotifications ? (
        inviteNotifications.map((item) => {
          return (
            <NotificationItem
              letter={item.senderName[0]}
              name={item.senderName}
              role={item.role}
              noteTitle={item.title}
              createdAt={item.createdAt}
            ></NotificationItem>
          );
        })
      ) : (
        <p className="text-(--text-light) text-xs">
          You dont have any notification yet.
        </p>
      )}
    </div>
  );
}
export default NotificationBoxBody;
