import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import AuthHeader from "../components/common/AuthHeader";
import Input from "../components/common/Input";

function LoginForm() {
  return (
    <div className="flex flex-col gap-5 justify-start items-start p-10 w-full max-w-lg bg-(--bg-dark) rounded-md">
      <div className="flex justify-center w-full">
        <AuthHeader
          title="Welcome back"
          description="Join us to start organizing your thoughts"
        />
      </div>
      <Input label="Email" type="email" placeholder="you@example.com"></Input>
      <Input label="Password" type="password" placeholder="••••••••"></Input>
      <Button
        variant="dark"
        className="py-3 px-2 w-full flex justify-center text-base"
      >
        Log in
      </Button>
      <div className="flex items-center gap-2">
        <p className="text-(--text-light) font-base text-sm">
          Don't have an account?
        </p>
        <Link
          to="/auth/register"
          className="text-(--text) font-base text-sm underline hover:text-(--primary)"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
export default LoginForm;
