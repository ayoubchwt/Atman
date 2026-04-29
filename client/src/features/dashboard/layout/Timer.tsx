import TimerActions from "../components/TimerActions";
import TimerClock from "../components/TimerClock";
import TimerSettings from "../components/TimerSettings";
import TimerHeader from "../components/TimerHeader";

function Timer() {
  return (
    <div className="absolute flex flex-col justify-between w-95 h-120 right-4 bottom-4 bg-(--bg) z-50 p-4 rounded-md shadow-xl">
      <div className="flex flex-col w-full gap-3">
        <TimerHeader></TimerHeader>
        <TimerSettings></TimerSettings>
      </div>
      <div className="flex flex-col w-full h-full justify-center pb-2 gap-9">
        <TimerClock></TimerClock>
        <TimerActions></TimerActions>
      </div>
      <p className="w-full text-center text-(--text-light)">
        Sessions completed : <span className="text-(--text)">0</span>
      </p>
    </div>
  );
}
export default Timer;
