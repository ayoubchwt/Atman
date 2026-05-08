import EmailForm from "../components/EmailForm";
import ProfileForm from "../components/ProfileForm";

function SettingsBody() {
  return (
    <div className="flex flex-col justify-center items-center">
      <ProfileForm></ProfileForm>
      <EmailForm></EmailForm>
    </div>
  );
}
export default SettingsBody;
