import { UserX } from "lucide-react";
import Button from "../../../components/ui/Button";
import UserCard from "./UserCard";
function AccessCard({
  letter,
  name,
  email,
  role,
  onRemove,
}: {
  letter: string;
  name: string;
  email: string;
  role: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <UserCard letter={letter} name={name} email={email}></UserCard>
      <div className="flex items-center gap-2">
        <h1 className="text-sm text-(--text-light)">
          {role[0].toUpperCase() + role.slice(1)}
        </h1>
        {role !== "owner" && (
          <Button
            variant="ghostTinted"
            className="rounded-xl p-1.5"
            onClick={onRemove}
          >
            <UserX className="w-4 h-4"></UserX>
          </Button>
        )}
      </div>
    </div>
  );
}
export default AccessCard;
