import { X } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useTimer } from "../hooks/useTimer";

function TimerHeader() {
  const { setTimerOpen } = useTimer();
  return (
    <div className="w-full flex items-center justify-between">
      <h1 className="font-semibold text-(--text)">Pomodoro</h1>
      <Button
        variant="ghost"
        className="p-2"
        onClick={() => setTimerOpen(false)}
      >
        <X className="w-5 h-5"></X>
      </Button>
    </div>
  );
}
export default TimerHeader;
