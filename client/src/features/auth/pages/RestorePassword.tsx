import { Link, Outlet } from "react-router-dom";
import Logo from "../../../components/ui/Logo";

function RestorePassword() {
  return (
    <div className="flex justify-center items-center w-full h-full relative px-2">
      <div className="absolute left-4 top-5">
        <Link to="/home">
          <Logo></Logo>
        </Link>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
export default RestorePassword;
