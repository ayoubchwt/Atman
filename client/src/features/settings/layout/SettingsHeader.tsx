import { ArrowLeft } from "lucide-react";
import Button from "../../../components/ui/Button";
import user from "../../../assets/pictures/user.png";
import { Link } from "react-router-dom";

function SettingsHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-(--bg-dark)">
      <div className="flex items-center gap-5">
        <Link to="/home">
          <Button variant="ghostTinted">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold font-serif">Settings</h1>
      </div>
      <img src={user} className="w-8 h-8"></img>
    </div>
  );
}
export default SettingsHeader;
