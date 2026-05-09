import { Mail } from "lucide-react";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/ui/InputField";
import { useEmailSettings } from "../hooks/useEmailSettings";
import SectionHeader from "./SectionHeader";

function EmailForm() {
  const { email, setEmail, onSubmit } = useEmailSettings();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-5 items-start p-4 bg-(--bg-dark) rounded-md border border-(--bg-dark) w-2xl"
    >
      <SectionHeader
        title="Email Address"
        description="Update the email associated with your account"
        icon={<Mail className="w-6 h-6" />}
      ></SectionHeader>
      <InputField
        type="text"
        placeholder="Your Name"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></InputField>
      <Button variant="dark">Update Email</Button>
    </form>
  );
}
export default EmailForm;
