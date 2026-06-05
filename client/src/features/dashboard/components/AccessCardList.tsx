import { useShareNote } from "../hooks/useShareNote";
import AccessCard from "./AccessCard";

function AccessCardList() {
  const { collaborators, removeCollaborator } = useShareNote();
  return (
    <div className="flex flex-1 min-h-0 overflow-auto scrollbar-hide pt-2 gap-2 shrink flex-col w-full">
      {collaborators.map((collaborator) => {
        return (
          <AccessCard
            key={collaborator.userId}
            letter={collaborator.name[0]}
            email={collaborator.email}
            name={collaborator.name}
            role={collaborator.role}
            onRemove={() => removeCollaborator(collaborator.userId)}
          ></AccessCard>
        );
      })}
    </div>
  );
}
export default AccessCardList;
