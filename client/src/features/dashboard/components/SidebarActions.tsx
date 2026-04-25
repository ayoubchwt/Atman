import Button from "../../../components/ui/Button";
import ToggleInput from "../../../components/ui/ToggleInput";
import { LogOut } from "lucide-react";
import { useSidebarActions } from "../hooks/useSideBarActions";

function SidebarActions({ className }: { className?: string }) {
  const { handleLogout, isAuthenticated, toggleTheme, isDark } =
    useSidebarActions();
  return (
    <div className={className}>
      <ToggleInput onChange={toggleTheme} checked={isDark} />
      {isAuthenticated && (
        <Button variant="ghostTinted" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
export default SidebarActions;
