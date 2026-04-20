import { LogOut } from "lucide-react";
import Button from "../../../components/ui/Button";
import { useThemeStore } from "../../../store/useThemeStore";
import ToggleInput from "../../../components/ui/ToggleInput";

function SidebarActions() {
  const { isDark, toggleTheme } = useThemeStore();
  return (
    <div className="flex justify-between items-center p-4 w-full">
      <ToggleInput onChange={toggleTheme} checked={isDark}></ToggleInput>
      <Button variant="ghostPrimary">
        <LogOut />
      </Button>
    </div>
  );
}
export default SidebarActions;
