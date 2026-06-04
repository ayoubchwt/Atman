import { useShareNote } from "../hooks/useShareNote";
import AccessCard from "./AccessCard";

function AccessCardList() {
  const { collaborators } = useShareNote();
  return (
    <div className="flex flex-1 min-h-0 overflow-auto scrollbar-hide pt-2 gap-2 shrink flex-col w-full">
      {collaborators.map((collaborator) => {
        return (
          <AccessCard
            letter={collaborator.name}
            email={collaborator.email}
            name={collaborator.name}
            role={collaborator.role}
          ></AccessCard>
        );
      })}
    </div>
  );
}
export default AccessCardList;
