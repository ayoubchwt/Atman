import { Sparkles } from "lucide-react";
import Button from "../../../components/ui/Button";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
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
        <Link to="/auth/login">
          <Button variant="ghostTinted">Log in</Button>
        </Link>
        <Link to="/auth/register">
          <Button variant="dark">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
export default NavBar;
