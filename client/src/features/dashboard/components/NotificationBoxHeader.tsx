function NotificationBoxHeader({
  notificationNumber,
}: {
  notificationNumber: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-md text-(--text) font-serif">Notification</h1>
      <h1 className="text-sm">{notificationNumber} new</h1>
    </div>
  );
}
export default NotificationBoxHeader;
