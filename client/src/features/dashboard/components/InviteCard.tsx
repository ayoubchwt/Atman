import { Clock, Trash } from "lucide-react";
import ShareUserIcon from "./ShareUserIcon";
import Button from "../../../components/ui/Button";
import DropDown, { type DropDownOption } from "../../../components/ui/DropDown";

function InviteCard({
  letter,
  email,
  name,
  status,
  onChange,
  onDelete,
  role,
}: {
  letter: string;
  email: string;
  name: string;
  status: string;
  onChange: (role: string) => void;
  onDelete: () => void;
  role: string;
}) {
  const options: DropDownOption[] = [
    {
      label: "Editor",
      value: "editor",
    },
    {
      label: "Viewer",
      value: "viewer",
    },
  ];
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ShareUserIcon letter={letter} className="w-8 h-8"></ShareUserIcon>
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-(--text) text-sm">{name}</h1>
            <div className="flex items-center gap-1 bg-(--bg-dark) py-1 px-2 rounded-xl">
              <Clock className="text-(--text-light) w-3 h-3" />
              <p className="text-xs text-(--text-light)">{status}</p>
            </div>
          </div>
          <p className="text-xs text-(--text-light)">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropDown
          options={options}
          setValue={() => onChange}
          value={role}
          className="w-26 h-8"
        ></DropDown>
        <Button variant="ghostTinted" onClick={onDelete} className="p-2 rounded-xl">
          <Trash className="text-(--text-light) w-4 h-4"/>
        </Button>
      </div>
    </div>
  );
}
export default InviteCard;
