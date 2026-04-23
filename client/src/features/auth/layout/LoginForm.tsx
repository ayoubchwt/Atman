import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import AuthHeader from "../components/common/AuthHeader";
import Input from "../components/common/Input";
import { useLogin } from "../hooks/useLogin";
import { useEffect, type ChangeEvent } from "react";
import AlertBox from "../components/ui/AlertBox";

function LoginForm() {
  const { setEmail, setPassword, isLoading, error, onSubmit, resetStatus } =
    useLogin();
  useEffect(() => {
    return () => resetStatus();
  }, [resetStatus]);
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 justify-start items-start p-10 w-full max-w-lg bg-(--bg-dark) rounded-md"
    >
      <div className="flex justify-center w-full">
        <AuthHeader
          title="Welcome back"
          description="Join us to start organizing your thoughts"
        />
      </div>
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      ></Input>
      <div className=" flex flex-col w-full gap-1">
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        ></Input>
        <Link
          to="/auth/forgot"
          className="text-(--text-light) font-base text-sm underline hover:text-(--primary)"
        >
          Forgot password?
        </Link>
      </div>
      {error && <AlertBox input={error} variant="failure"></AlertBox>}
      <Button
        variant="dark"
        className="py-3 px-2 w-full flex justify-center text-base rounded-md"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log in"}
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
      <div className="flex items-center gap-2"></div>
    </form>
  );
}
export default LoginForm;
