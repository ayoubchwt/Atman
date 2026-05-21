import NotificationItem from "./NotificationItem";

function NotificationBoxBody() {
  return (
    <div className="flex flex-col w-full">
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
    </div>
  );
}
export default NotificationBoxBody;
