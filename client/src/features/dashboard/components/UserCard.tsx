import ShareUserIcon from "./ShareUserIcon";

function UserCard({
  letter,
  name,
  email,
}: {
  letter: string;
  name: string;
  email: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <ShareUserIcon letter={letter} className="w-7 h-7"></ShareUserIcon>
      <div className="flex flex-col">
        <h1 className="text-sm text-(--text)">{name}</h1>
        <p className="text-xs text-(--text-light)">{email}</p>
      </div>
    </div>
  );
}
export default UserCard;
