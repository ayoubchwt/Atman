import { useShareNote } from "../hooks/useShareNote";
import InviteCard from "./InviteCard";

function InviteCardList() {
  const { noteInvites } = useShareNote();
  const tmp = () => {
    console.log("idk");
  };
  const tmp1 = () => {
    console.log("idk1");
  };
  return (
    <div className="flex flex-1 min-h-0 overflow-auto scrollbar-hide pt-2 gap-2 shrink flex-col w-full">
      {noteInvites.map((invite) => {
        return (
          <InviteCard
            letter={invite.guestName[0]}
            email={invite.guestEmail}
            name={invite.guestName}
            role={invite.role}
            status={invite.status}
            onChange={tmp}
            onDelete={tmp1}
          ></InviteCard>
        );
      })}
    </div>
  );
}
export default InviteCardList;
