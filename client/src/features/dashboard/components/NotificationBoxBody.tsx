import NotificationItem from "./NotificationItem";

function NotificationBoxBody() {
  return (
    <div className="flex flex-1 min-h-0 overflow-auto scrollbar-hide flex-col w-full p-3">
      <NotificationItem
        letter="E"
        name="Eclipse"
        role="Viewer"
        noteTitle="Berserk"
        createdAt="2s ago"
      ></NotificationItem>
      <NotificationItem
        letter="L"
        name="Lucy"
        role="Editor"
        noteTitle="Cyberpunk"
        createdAt="Yesterday"
      ></NotificationItem>
      <NotificationItem
        letter="L"
        name="Lucy"
        role="Editor"
        noteTitle="Cyberpunk"
        createdAt="Yesterday"
      ></NotificationItem>
      <NotificationItem
        letter="L"
        name="Lucy"
        role="Editor"
        noteTitle="Cyberpunk"
        createdAt="Yesterday"
      ></NotificationItem>
    </div>
  );
}
export default NotificationBoxBody;
