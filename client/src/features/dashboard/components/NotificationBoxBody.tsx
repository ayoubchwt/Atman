import { useShareNote } from "../hooks/useShareNote";
import NotificationItem from "./NotificationItem";

function NotificationBoxBody() {
  const { inviteNotifications, onAccept, onDecline } = useShareNote();
  return (
    <div className="flex flex-1 min-h-0 overflow-auto scrollbar-hide flex-col w-full p-3">
      {inviteNotifications.length ? (
        inviteNotifications.map((item) => {
          return (
            <NotificationItem
              key={item.id}
              letter={item.senderName[0]}
              name={item.senderName}
              role={item.role}
              noteTitle={item.title}
              createdAt={item.createdAt}
              onAccept={() => onAccept(item.id)}
              onDecline={() => onDecline(item.id)}
            ></NotificationItem>
          );
        })
      ) : (
        <p className="text-(--text-light) text-xs w-full text-center">
          You dont have any new notifications
        </p>
      )}
    </div>
  );
}
export default NotificationBoxBody;
