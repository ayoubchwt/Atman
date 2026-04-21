import { X } from "lucide-react";
import Button from "../../../components/ui/Button";
import user from "../../../assets/pictures/user.png";
import { Link } from "react-router-dom";
import SidebarActions from "./SidebarActions";
function NavbarDropDown({
  isOpen,
  isAuthenticated,
  onClose,
}: {
  isOpen: boolean;
  isAuthenticated: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return <></>;
  return (
    <div className="absolute right-0 top-0 w-full h-full bg-(--bg) z-50">
      <Button
        variant="ghostTinted"
        className="absolute right-6 top-6"
        onClick={onClose}
      >
        <X className="w-8 h-8" />
      </Button>
      <div className="flex flex-col h-full w-full gap-3 items-center justify-center">
        {isAuthenticated ? (
          <img src={user} className="w-8 h-8"></img>
        ) : (
          <Link to="/auth/login">
            <Button
              variant="dark"
              className="p-2 w-40 h-10 flex justify-center items-center"
            >
              Sync Your Notes
            </Button>
          </Link>
        )}
        <SidebarActions className="flex flex-col items-center justify-center gap-5 p-6"></SidebarActions>
      </div>
    </div>
  );
}
export default NavbarDropDown;
