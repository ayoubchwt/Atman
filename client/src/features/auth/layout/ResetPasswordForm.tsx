import AuthHeader from "../components/common/AuthHeader";
import Input from "../components/common/Input";
import Button from "../../../components/ui/Button";
import AlertBox from "../components/ui/AlertBox";
import { useRestorePassword } from "../hooks/useRestorePassword";

function ResetPasswordForm() {
  const {
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    passwordError,
    onResetPasswordSubmit,
    isLoading,
    error,
    message,
  } = useRestorePassword();

  return (
    <form
      onSubmit={onResetPasswordSubmit}
      className="flex flex-col gap-5 justify-start items-start p-10 w-full max-w-lg bg-(--bg-dark) rounded-md"
    >
      <AuthHeader
        title="Set New Password"
        description="Your identity has been verified. Choose a strong new password to secure your account."
      />

      <Input
        label="New Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        label="Confirm New Password"
        type="password"
        placeholder="••••••••"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      {passwordError && <AlertBox input={passwordError} variant="failure" />}
      {error && <AlertBox input={error} variant="failure" />}
      {message && <AlertBox input={message} variant="success" />}
      <Button
        variant="dark"
        className="py-3 px-2 w-full flex justify-center text-base rounded-md"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Reset Password"}
      </Button>
    </form>
  );
}
export default ResetPasswordForm;
