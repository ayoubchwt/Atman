import { Link } from "react-router-dom";
import Logo from "../../dashboard/components/Logo";
import RegisterForm from "../layout/RegisterForm";

function Register() {
  return (
    <div className="flex justify-center items-center w-full h-full relative">
      <div className="absolute left-4 top-5">
        <Link to="/home">
          <Logo></Logo>
        </Link>
      </div>
      <RegisterForm></RegisterForm>
    </div>
  );
}
export default Register;
