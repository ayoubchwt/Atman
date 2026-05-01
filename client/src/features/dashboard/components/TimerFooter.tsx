import { useTimer } from "../hooks/useTimer";

function TimerFooter() {
  const { user } = useTimer();
  return (
    <p className="w-full text-center text-(--text-light)">
      Sessions completed :{" "}
      <span className="text-(--text)">{user?.sessions || 0}</span>
    </p>
  );
}
export default TimerFooter;
