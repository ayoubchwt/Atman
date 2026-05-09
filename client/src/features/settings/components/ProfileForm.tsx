import { User } from "lucide-react";
import SectionHeader from "./SectionHeader";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import { useProfileSettings } from "../hooks/useProfileSettings";

function ProfileForm() {
  const { onSubmit, userName, setUserName } = useProfileSettings();
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 items-start p-4 bg-(--bg-dark) rounded-md w-xl"
    >
      <SectionHeader
        title="Profile"
        description="Manage your display name and personal info"
        icon={<User className="w-6 h-6" />}
      ></SectionHeader>
      <InputField
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></InputField>
      <Button variant="dark">Save Changes</Button>
    </form>
  );
}
export default ProfileForm;
