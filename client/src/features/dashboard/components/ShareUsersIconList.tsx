import { useShareStore } from "../../../store/useShareStore";
import ShareUserIcon from "./ShareUserIcon";
function ShareUsersIconList() {
  const { collaborators } = useShareStore();
  return (
    <div className="flex items-center justify-center -space-x-2.5">
      {collaborators.map((collaborator) => {
        return (
          <ShareUserIcon
            letter={collaborator.name[0]}
            className="w-7 h-7"
          ></ShareUserIcon>
        );
      })}
    </div>
  );
}
export default ShareUsersIconList;
