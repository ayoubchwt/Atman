import { useInvite } from "../hooks/useInvite";
import { useShareNote } from "../hooks/useShareNote";
import InviteCard from "./InviteCard";

function InviteCardList() {
  const { noteInvites } = useShareNote();
  const { onDelete, onUpdate } = useInvite();
  return (
    <div className="flex flex-1 min-h-0 overflow-auto scrollbar-hide pt-2 gap-2 shrink flex-col w-full">
      {noteInvites.map((invite) => {
        return (
          <InviteCard
            key={invite.id}
            letter={invite.guestName[0]}
            email={invite.guestEmail}
            name={invite.guestName}
            role={invite.role}
            status={invite.status}
            onChange={(role) => {
              onUpdate(role, invite.id);
            }}
            onDelete={() => onDelete(invite.id)}
          ></InviteCard>
        );
      })}
    </div>
  );
}
export default InviteCardList;
