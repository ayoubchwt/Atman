import { Sparkles } from "lucide-react";
import Button from "../../../components/ui/Button";
import Logo from "../../../components/ui/Logo";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import user from "../../../assets/pictures/user.png";
function NavBar({ className }: { className?: string }) {
  const { isAuthenticated } = useAuthStore();
  return (
    <div
      className={`flex p-4 w-full justify-between items-center border-(--bg-dark) border ${className}`}
    >
      <Logo></Logo>
      <div className="flex flex-row gap-3 items-center">
        <Button variant="primary">
          <Sparkles className="w-5 h-5"></Sparkles>
          Upgrade Plan
        </Button>
        {isAuthenticated ? (
          <img src={user} className="w-8 h-8"></img>
        ) : (
          <Link to="/auth/login">
            <Button variant="dark">Sync Your Notes</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
export default NavBar;
