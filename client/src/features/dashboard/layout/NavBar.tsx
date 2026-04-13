import { Sparkles } from "lucide-react";
import Button from "../../../components/ui/Button";
import Logo from "../components/Logo";
function NavBar({ className }: { className: string }) {
  return (
    <div
      className={`flex p-4 w-full justify-between items-center border-(--bg-dark) border ${className}`}
    >
      <Logo></Logo>
      <div className="flex flex-row gap-3">
        <Button variant="primary">
          <Sparkles className="w-5 h-5"></Sparkles>
          Upgrade Plan
        </Button>
        <Button variant="ghostTinted">Log in</Button>
        <Button variant="dark">Sign Up</Button>
      </div>
    </div>
  );
}
export default NavBar;
