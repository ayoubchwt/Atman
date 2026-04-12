import Button from "../components/ui/Button";
import { Sparkles, Plus } from "lucide-react";
import NavBar from "../features/editor/layout/NavBar";
import SideBar from "../features/editor/layout/SideBar";
function ButtonsSendbox() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-3">
        <Button variant="primary">
          <Sparkles className="w-5 h-5"></Sparkles>
          Upgrade Plan
        </Button>
        <Button variant="dark">Sign Up</Button>
        <Button variant="ghostTinted">Log in</Button>
        <Button variant="ghostPrimary">Save</Button>
        <Button variant="ghostTinted">
          <Plus></Plus>
        </Button>
      </div>
      <NavBar></NavBar>
      <SideBar></SideBar>
    </div>
  );
}
export default ButtonsSendbox;
