import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import AuthHeader from "../components/common/AuthHeader";
import Input from "../components/common/Input";

function RegisterForm() {
  return (
    <div className="flex flex-col gap-5 justify-start items-start p-10 w-full max-w-lg bg-(--bg-dark) rounded-md">
      <div className="flex justify-center w-full">
        <AuthHeader
          title="Create Account"
          description="Sign in to save and sync your notes"
        />
      </div>

      <Input label="Name" type="text" placeholder="John Doe" />

      <Input label="Email" type="email" placeholder="you@example.com" />

      <Input label="Password" type="password" placeholder="••••••••" />

      <Input label="Confirm Password" type="password" placeholder="••••••••" />

      <Button
        variant="dark"
        className="py-3 px-2 w-full flex justify-center text-base"
      >
        Create Account
      </Button>

      <div className="flex items-center gap-2">
        <p className="text-(--text-light) font-base text-sm">
          Already have an account?
        </p>
        <Link
          to="/auth/login"
          className="text-(--text) font-base text-sm underline hover:text-(--primary)"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
