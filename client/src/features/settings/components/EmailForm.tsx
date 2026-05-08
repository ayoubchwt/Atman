import { Mail } from "lucide-react";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/ui/InputField";
import { useEmailSettings } from "../hooks/useEmailSettings";
import SectionHeader from "./SectionHeader";

function EmailForm() {
  const { email, setEmail, onSubmit } = useEmailSettings();
  return (
    <form onSubmit={onSubmit}>
      <SectionHeader
        title="Email Address"
        description="Update the email associated with your account"
        icon={<Mail />}
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
