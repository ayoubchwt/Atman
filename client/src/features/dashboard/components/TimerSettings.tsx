import Button from "../../../components/ui/Button";

function TimerSettings() {
  return (
    <div className="flex items-center justify-center w-full bg-(--item-light) rounded-md p-1.5">
      <Button variant="ghost" className="w-full p-2 rounded-md">
        Focus
      </Button>
      <Button variant="ghost" className="w-full p-2 rounded-md">
        Short
      </Button>
      <Button variant="ghost" className="w-full p-2 rounded-md">
        Long
      </Button>
    </div>
  );
}
export default TimerSettings;
