import { Play, RotateCcw } from "lucide-react";
import Button from "../../../components/ui/Button";

function TimerActions() {
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <Button variant="ghostTinted" className="rounded-md p-2">
        <RotateCcw className="w-5 h-5" />
      </Button>
      <Button variant="dark" className="py-2 px-5 rounded-md gap-2">
        <Play className="w-4 h-4" />
        <span className="font-semibold text-md">Start</span>
      </Button>
    </div>
  );
}
export default TimerActions;
