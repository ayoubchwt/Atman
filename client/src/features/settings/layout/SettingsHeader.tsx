import { MoveLeft } from "lucide-react";
import Button from "../../../components/ui/Button";

function SettingsHeader() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="ghostTinted">
        <MoveLeft />
      </Button>
      <h1 className="text-xl">Settings</h1>
    </div>
  );
}
export default SettingsHeader;
