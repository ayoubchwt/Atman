import { KeyRound } from "lucide-react";
import { usePasswordSettings } from "../hooks/usePasswordSettings";
import SectionHeader from "./SectionHeader";
import InputField from "../../../components/ui/InputField";

function PasswordForm() {
  const { setOldPassword, setPassword, setPasswordConfirm, onSubmit } =
    usePasswordSettings();
  return (
    <form onSubmit={onSubmit}>
      <SectionHeader
        title="Password"
        description="Change your account password"
        icon={<KeyRound />}
      ></SectionHeader>
      <InputField
        type="password"
        placeholder="••••••••"
        onChange={(e) => setOldPassword(e.target.value)}
      ></InputField>
      <InputField
        type="password"
        placeholder="••••••••"
        onChange={(e) => setPassword(e.target.value)}
      ></InputField>
      <InputField
        type="password"
        placeholder="••••••••"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      ></InputField>
    </form>
  );
}
export default PasswordForm;
