import { Sparkles } from "lucide-react";
import Button from "../../../components/ui/Button";
import Logo from "../components/Logo";
function NavBar() {
  return (
    <div className="flex p-4 w-full justify-between items-center border-(--bg-light) border">
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
