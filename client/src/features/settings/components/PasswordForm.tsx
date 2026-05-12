import { KeyRound } from "lucide-react";
import { usePasswordSettings } from "../hooks/usePasswordSettings";
import SectionHeader from "./SectionHeader";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";
import AlertBox from "../../../components/ui/AlertBox";

function PasswordForm() {
  const {
    setOldPassword,
    setPassword,
    setPasswordConfirm,
    passwordError,
    passwordSuccess,
    onSubmit,
  } = usePasswordSettings();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-5 items-start p-4 bg-(--bg-dark) rounded-md w-2xl"
    >
      <SectionHeader
        title="Password"
        description="Change your account password"
        icon={<KeyRound className="w-5 h-5" />}
      ></SectionHeader>
      <Input
        label="Old Password"
        type="password"
        placeholder="••••••••"
        onChange={(e) => setOldPassword(e.target.value)}
      ></Input>
      <Input
        label="New Password"
        type="password"
        placeholder="••••••••"
        onChange={(e) => setPassword(e.target.value)}
      ></Input>
      <Input
        label="Retype New Password"
        type="password"
        placeholder="••••••••"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      ></Input>
      {passwordError && (
        <AlertBox variant="failure" input={passwordError}></AlertBox>
      )}
      {passwordSuccess && (
        <AlertBox variant="success" input={passwordSuccess}></AlertBox>
      )}
      <div className="flex items-center gap-3">
        <Button variant="dark">Update Password</Button>
        <Link
          to="/auth/forgot"
          className="text-(--text-light) font-base text-sm underline hover:text-(--primary)"
        >
          Forgot password?
        </Link>
      </div>
    </form>
  );
}
export default PasswordForm;
