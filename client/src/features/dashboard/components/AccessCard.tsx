import UserCard from "./UserCard";
function AccessCard({
  letter,
  name,
  email,
  role,
}: {
  letter: string;
  name: string;
  email: string;
  role: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <UserCard letter={letter} name={name} email={email}></UserCard>
      <h1 className="text-sm text-(--text-light)">
        {role[0].toUpperCase() + role.slice(1)}
      </h1>
    </div>
  );
}
export default AccessCard;
