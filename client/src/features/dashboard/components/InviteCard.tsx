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
    <div className="flex items-center">
      <ShareUserIcon letter={letter} className="w-8 h-8"></ShareUserIcon>
      <div className="flex flex-col">
        <div className="flex items-center">
          <h1>{name}</h1>
          <div className="">
            <Clock className="w-3 h-3" />
            <p className="">{status}</p>
          </div>
        </div>
        <p>{email}</p>
      </div>
      <div>
        <DropDown
          options={options}
          setValue={() => onChange}
          value={role}
          className="w-full"
        ></DropDown>
        <Button variant="ghost" onClick={onDelete}>
          <Trash />
        </Button>
      </div>
    </div>
  );
}
export default InviteCard;
