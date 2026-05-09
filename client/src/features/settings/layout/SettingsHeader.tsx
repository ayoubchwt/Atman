import { ArrowLeft } from "lucide-react";
import Button from "../../../components/ui/Button";

function SettingsHeader() {
  return (
    <div className="flex items-center p-4 border-b border-(--bg-dark) gap-5">
      <Button variant="ghostTinted">
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <h1 className="text-xl font-semibold font-serif">Settings</h1>
    </div>
  );
}
export default SettingsHeader;
