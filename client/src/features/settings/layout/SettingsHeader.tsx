import { MoveLeft } from "lucide-react";
import Button from "../../../components/ui/Button";

function SettingsHeader() {
  return (
    <div className="flex items-center">
      <Button variant="ghostTinted">
        <MoveLeft />
      </Button>
    </div>
  );
}
export default SettingsHeader;
