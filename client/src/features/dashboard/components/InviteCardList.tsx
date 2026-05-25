import InviteCard from "./InviteCard";

function InviteCardList() {
  const temp = (role: string) => {
    console.log(role);
  };
  const temp2 = () => {
    // addict
  };
  return (
    <div className="flex flex-1 min-h-0 overflow-auto scrollbar-hide pt-2 gap-2 shrink flex-col w-full">
      <InviteCard
        letter="E"
        email="Eclipse@gmail.com"
        name="Eclipse"
        status="pending"
        onChange={temp}
        onDelete={temp2}
        role="viewer"
      ></InviteCard>
      <InviteCard
        letter="E"
        email="Eclipse@gmail.com"
        name="Eclipse"
        status="pending"
        onChange={temp}
        onDelete={temp2}
        role="viewer"
      ></InviteCard>
      <InviteCard
        letter="E"
        email="Eclipse@gmail.com"
        name="Eclipse"
        status="pending"
        onChange={temp}
        onDelete={temp2}
        role="viewer"
      ></InviteCard>
      <InviteCard
        letter="E"
        email="Eclipse@gmail.com"
        name="Eclipse"
        status="pending"
        onChange={temp}
        onDelete={temp2}
        role="viewer"
      ></InviteCard>
      F
    </div>
  );
}
export default InviteCardList;
