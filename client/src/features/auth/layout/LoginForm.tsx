import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import AuthHeader from "../components/common/AuthHeader";
import Input from "../components/common/Input";
import { useLogin } from "../hooks/useLogin";
import type { ChangeEvent } from "react";

function LoginForm() {
  const { setEmail, setPassword, isLoading, error, onSubmit, message } =
    useLogin();
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
      {message && <p className="text-green-500 text-sm">{message}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      ></Input>
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      ></Input>
      <Button
        variant="dark"
        className="py-3 px-2 w-full flex justify-center text-base"
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
    </form>
  );
}
export default LoginForm;
