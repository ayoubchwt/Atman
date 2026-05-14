import { Bell, Menu, Settings } from "lucide-react";
import Button from "../../../components/ui/Button";
import Logo from "../../../components/ui/Logo";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import user from "../../../assets/pictures/user.png";
import { useState } from "react";
import NavbarDropDown from "../components/NavbarDropDown";
function NavBar({ className }: { className?: string }) {
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`flex p-4 w-full justify-between items-center border-(--bg-dark) border ${className}`}
    >
      <Logo></Logo>
      <div className="hidden md:flex flex-row gap-3 items-center">
        {isAuthenticated ? (
          <>
            <div className="flex items-center justify-center">
              <Button variant="ghostTinted" className="hidden">
                <Bell className="w-5 h-5" />
              </Button>
              <Link to="/settings">
                <Button variant="ghostTinted">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <img src={user} className="w-8 h-8"></img>
          </>
        ) : (
          <Link to="/auth/login">
            <Button variant="dark">Sync Your Notes</Button>
          </Link>
        )}
      </div>
      <div className="flex md:hidden">
        <Button variant="ghostTinted" onClick={() => setIsOpen(true)}>
          <Menu />
        </Button>
      </div>
      <NavbarDropDown
        isAuthenticated={isAuthenticated}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      ></NavbarDropDown>
    </div>
  );
}
export default NavBar;
