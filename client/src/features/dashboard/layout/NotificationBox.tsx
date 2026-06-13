import NotificationBoxBody from "../components/NotificationBoxBody";
import NotificationBoxHeader from "../components/NotificationBoxHeader";

function NotificationBox() {
  return (
    <div className=" absolute z-105 right-1/2 mt-1 flex flex-col bg-(--bg) border border-(--bg-dark) rounded-2xl rounded-tr-none shadow-md w-80 h-70">
      <NotificationBoxHeader></NotificationBoxHeader>
      <NotificationBoxBody></NotificationBoxBody>
    </div>
  );
}
export default NotificationBox;
