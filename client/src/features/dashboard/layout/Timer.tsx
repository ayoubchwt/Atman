import TimerActions from "../components/TimerActions";
import TimerClock from "../components/TimerClock";
import TimerSettings from "../components/TimerSettings";
import TimerHeader from "../components/TimerHeader";
import TimerFooter from "../components/TimerFooter";

function Timer() {
  return (
    <div className="absolute flex flex-col justify-between w-95 h-120 right-4 bottom-4 bg-(--bg) z-50 p-4 rounded-md shadow-md border-(--bg-dark) border">
      <div className="flex flex-col w-full gap-3">
        <TimerHeader></TimerHeader>
        <TimerSettings></TimerSettings>
      </div>
      <div className="flex flex-col w-full h-full justify-center pb-2 gap-9">
        <TimerClock></TimerClock>
        <TimerActions></TimerActions>
      </div>
      <TimerFooter></TimerFooter>
    </div>
  );
}
export default Timer;
