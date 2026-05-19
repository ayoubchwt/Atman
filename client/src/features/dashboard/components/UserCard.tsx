import ShareUser from "./ShareUser";

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
    <div className="flex items-center justify-center">
      <ShareUser letter={letter}></ShareUser>
      <div className="flex flex-col">
        <h1 className="text-md text-(--text)">{name}</h1>
        <p className="text-sm text-(--text-light)">{email}</p>
      </div>
    </div>
  );
}
export default UserCard;
