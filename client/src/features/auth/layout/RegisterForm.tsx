import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import AuthHeader from "../components/common/AuthHeader";
import Input from "../components/common/Input";
import { useEffect, type ChangeEvent } from "react";
import { useRegister } from "../hooks/useRegister";
import AlertBox from "../components/ui/AlertBox";

function RegisterForm() {
  const {
    error,
    message,
    setName,
    name,
    setEmail,
    email,
    setPassword,
    password,
    setPasswordConfirm,
    passwordConfirm,
    isLoading,
    onSubmit,
    resetStatus,
  } = useRegister();
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
          title="Create Account"
          description="Sign in to save and sync your notes"
        />
      </div>
      <div className="min-h-2 w-full"></div>
      <Input
        label="Name"
        type="text"
        value={name}
        placeholder="John Doe"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />

      <Input
        label="Email"
        type="email"
        value={email}
        placeholder="you@example.com"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />

      <Input
        label="Password"
        type="password"
        value={password}
        placeholder="••••••••"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />

      <Input
        label="Confirm Password"
        type="password"
        value={passwordConfirm}
        placeholder="••••••••"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPasswordConfirm(e.target.value)
        }
      />
      {error && <AlertBox input={error} variant="failure"></AlertBox>}
      {message && <AlertBox input={message} variant="success"></AlertBox>}
      <Button
        variant="dark"
        className="py-3 px-2 w-full flex justify-center text-base"
        disabled={isLoading}
      >
        {isLoading ? "Creating account" : "Create Account"}
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
    </form>
  );
}

export default RegisterForm;
