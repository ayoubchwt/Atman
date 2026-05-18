import ShareUser from "./ShareUser";
function ShareUsersList() {
  return (
    <div className="flex items-center justify-center -space-x-2.5">
      <ShareUser letter="A"></ShareUser>
      <ShareUser letter="B"></ShareUser>
      <ShareUser letter="E"></ShareUser>
    </div>
  );
}
export default ShareUsersList;
