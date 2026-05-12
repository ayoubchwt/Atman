import { Mail } from "lucide-react";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/ui/InputField";
import { useEmailSettings } from "../hooks/useEmailSettings";
import SectionHeader from "./SectionHeader";
import AlertBox from "../../../components/ui/AlertBox";
import SettingsOtp from "./SettingsOtp";

function EmailForm() {
  const {
    email,
    setEmail,
    onSubmit,
    otpVisible,
    otp,
    setOtp,
    emailError,
    emailSuccess,
  } = useEmailSettings();
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
      {!otpVisible && (
        <SettingsOtp
          code={otp}
          setCode={setOtp}
          message="An email that contains a verification code has been sent to your email address"
        ></SettingsOtp>
      )}
      {emailError && <AlertBox variant="failure" input={emailError}></AlertBox>}
      {emailSuccess && (
        <AlertBox variant="success" input={emailSuccess}></AlertBox>
      )}
      <Button variant="dark">{otpVisible ? "Update Email" : "Confirm"}</Button>
    </form>
  );
}
export default EmailForm;
