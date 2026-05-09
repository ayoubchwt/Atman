import { KeyRound } from "lucide-react";
import { usePasswordSettings } from "../hooks/usePasswordSettings";
import SectionHeader from "./SectionHeader";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

function PasswordForm() {
  const { setOldPassword, setPassword, setPasswordConfirm, onSubmit } =
    usePasswordSettings();
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 items-start p-4 bg-(--bg-dark) rounded-md w-xl"
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
      <Button variant="dark">Update Password</Button>
    </form>
  );
}
export default PasswordForm;
