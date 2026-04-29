import Button from "../../../components/ui/Button";
import { useTimer } from "../hooks/useTimer";

function TimerSettings() {
  const { selectedMode, setSelectedMode } = useTimer();
  return (
    <div className="flex items-center justify-center w-full bg-(--item-light) rounded-md p-1.5">
      <Button
        variant={selectedMode === "focus" ? "ghostStatic" : "ghost"}
        className="w-full p-2 rounded-md"
        onClick={() => setSelectedMode("focus")}
      >
        Focus
      </Button>
      <Button
        variant={selectedMode === "short" ? "ghostStatic" : "ghost"}
        className="w-full p-2 rounded-md"
        onClick={() => setSelectedMode("short")}
      >
        Short
      </Button>
      <Button
        variant={selectedMode === "long" ? "ghostStatic" : "ghost"}
        className="w-full p-2 rounded-md"
        onClick={() => setSelectedMode("long")}
      >
        Long
      </Button>
    </div>
  );
}
export default TimerSettings;
