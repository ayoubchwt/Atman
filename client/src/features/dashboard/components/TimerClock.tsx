import { Brain, Coffee } from "lucide-react";
import { useTimer } from "../hooks/useTimer";

function Timer() {
  const { selectedMode, formatTime } = useTimer();
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-6xl font-serif text-(--text)">
        {formatTime().minutes}:{formatTime().seconds}
      </h1>
      <div className="flex w-full items-center justify-center text-(--text-light) gap-1">
        {selectedMode === "focus" ? (
          <Brain className="w-4 h-4" />
        ) : (
          <Coffee className="w-4 h-4" />
        )}
        <p className="text-sm">{selectedMode}</p>
      </div>
    </div>
  );
}
export default Timer;
