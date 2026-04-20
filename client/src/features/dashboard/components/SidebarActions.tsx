import Button from "../../../components/ui/Button";
import { useThemeStore } from "../../../store/useThemeStore";
import ToggleInput from "../../../components/ui/ToggleInput";
import { LogOut } from "lucide-react";
import { useSidebarActions } from "../hooks/useSideBarActions";

function SidebarActions() {
  const { handleLogout, isAuthenticated, toggleTheme, isDark } =
    useSidebarActions();
  useThemeStore();
  return (
    <div className="flex justify-between items-center w-full">
      <ToggleInput onChange={toggleTheme} checked={isDark}></ToggleInput>
      {isAuthenticated && (
        <Button variant="ghostTinted" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
export default SidebarActions;
