import { Brain } from "lucide-react";

function Timer() {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-6xl font-serif text-(--text)">25:00</h1>
      <div className="flex w-full items-center justify-center text-(--text-light) gap-1">
        <Brain className="w-4 h-4" />
        <p className="text-sm">Focus</p>
      </div>
    </div>
  );
}
export default Timer;
