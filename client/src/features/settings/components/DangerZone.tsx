import { CircleAlert } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Button from "../../../components/ui/Button";

function DangerZone() {
  return (
    <div className="flex flex-col gap-5 items-start p-4 bg-(--bg-dark) rounded-md w-2xl">
      <SectionHeader
        title="Danger Zone"
        description="Irreversible actions on your account"
        icon={<CircleAlert />}
      ></SectionHeader>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <h1 className="text-md font-semibold">Delete Account</h1>
          <p className="text-xs text-(--text-light)">
            Permanently delete your account and all your notes
          </p>
        </div>
        <Button variant="danger">Delete Account</Button>
      </div>
    </div>
  );
}
export default DangerZone;
