import NotificationBoxBody from "../components/NotificationBoxBody";
import NotificationBoxHeader from "../components/NotificationBoxHeader";

function NotificationBox() {
  return (
    <div className=" absolute z-105 right-1/2 mt-1 flex flex-col bg-(--bg-dark) rounded-md w-70 h-70">
      <NotificationBoxHeader notificationNumber="2"></NotificationBoxHeader>
      <NotificationBoxBody></NotificationBoxBody>
    </div>
  );
}
export default NotificationBox;
