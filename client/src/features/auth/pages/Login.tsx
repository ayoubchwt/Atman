import { Link } from "react-router-dom";
import Logo from "../../../components/ui/Logo";
import LoginForm from "../layout/LoginForm";

function Login() {
  return (
    <div className="flex justify-center items-center w-full h-full relative px-2">
      <div className="absolute left-4 top-5">
        <Link to="/home">
          <Logo></Logo>
        </Link>
      </div>
      <LoginForm></LoginForm>
    </div>
  );
}
export default Login;
