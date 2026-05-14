import DangerZone from "../components/DangerZone";
import EmailForm from "../components/EmailForm";
import PasswordForm from "../components/PasswordForm";
import ProfileForm from "../components/ProfileForm";

function SettingsBody() {
  return (
    <div className=" h-full w-full flex flex-col items-center gap-2 overflow-auto min-w-0 p-2">
      <ProfileForm></ProfileForm>
      <EmailForm></EmailForm>
      <PasswordForm></PasswordForm>
      <DangerZone></DangerZone>
    </div>
  );
}
export default SettingsBody;
