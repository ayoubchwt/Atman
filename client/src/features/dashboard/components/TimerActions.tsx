import { Pause, Play, RotateCcw } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useTimer } from "../hooks/useTimer";

function TimerActions() {
  const { isRunning, setIsRunning, resetTimer } = useTimer();
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <Button
        variant="ghostTinted"
        className="rounded-md p-2"
        onClick={resetTimer}
      >
        <RotateCcw className="w-5 h-5" />
      </Button>
      {!isRunning ? (
        <Button
          variant="dark"
          className="w-25 h-8 rounded-md gap-2"
          onClick={() => setIsRunning(true)}
        >
          <Play className="w-4 h-4" />
          <span className="font-semibold text-md">Start</span>
        </Button>
      ) : (
        <Button
          variant="dark"
          className=" w-25 h-8 rounded-md gap-2"
          onClick={() => setIsRunning(false)}
        >
          <Pause className="w-4 h-4" />
          <span className="font-semibold text-md">Pause</span>
        </Button>
      )}
    </div>
  );
}
export default TimerActions;
