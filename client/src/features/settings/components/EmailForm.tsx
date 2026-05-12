import { Mail } from "lucide-react";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/ui/InputField";
import { useEmailSettings } from "../hooks/useEmailSettings";
import SectionHeader from "./SectionHeader";
import OtpInput from "react-otp-input";
import AlertBox from "../../../components/ui/AlertBox";

function EmailForm() {
  const { email, setEmail, onSubmit, otpVisible, otp, setOtp, emailError } =
    useEmailSettings();
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
      {otpVisible && (
        <OtpInput
          value={otp}
          onChange={(otp: string) => {
            setOtp(otp);
          }}
          numInputs={5}
          renderSeparator={<span> </span>}
          renderInput={(props) => (
            <input
              {...props}
              className="w-12 h-14 mx-1 text-2xl font-bold text-center text-(--text) border-2 border-(--bg-light) rounded-lg outline-0"
            ></input>
          )}
        ></OtpInput>
      )}
      {emailError && <AlertBox variant="failure" input={emailError}></AlertBox>}
      <Button variant="dark">{otpVisible ? "Update Email" : "Confirm"}</Button>
    </form>
  );
}
export default EmailForm;
