import { Moon, Sun } from "lucide-react";
import Switch from "react-switch";
function ToggleInput({
  onChange,
  checked,
}: {
  onChange: () => void;
  checked: boolean;
}) {
  return (
    <div className="flex items-center justify-center">
      <Switch
        onChange={onChange}
        checked={checked}
        onColor="#363a4f"
        offColor="#ffffff"
        offHandleColor="#f6f4ee"
        onHandleColor="#1e2030"
        handleDiameter={18}
        uncheckedIcon={
          <div className="flex items-center justify-center w-full h-full text-(--text-light)">
            <Moon className="w-4 h-4" />
          </div>
        }
        checkedIcon={
          <div className="flex items-center justify-center w-full h-full text-(--text-light)">
            <Sun className="w-4 h-4" />
          </div>
        }
        height={28}
        width={50}
      ></Switch>
    </div>
  );
}
export default ToggleInput;
