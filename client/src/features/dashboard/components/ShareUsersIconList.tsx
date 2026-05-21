import ShareUserIcon from "./ShareUserIcon";
function ShareUsersIconList() {
  return (
    <div className="flex items-center justify-center -space-x-2.5">
      <ShareUserIcon letter="A" className="w-7 h-7"></ShareUserIcon>
      <ShareUserIcon letter="B" className="w-7 h-7"></ShareUserIcon>
      <ShareUserIcon letter="E" className="w-7 h-7"></ShareUserIcon>
    </div>
  );
}
export default ShareUsersIconList;
