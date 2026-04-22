import AuthHeader from "../components/common/AuthHeader";
import OtpInput from "react-otp-input";
import { useRestorePassword } from "../hooks/useRestorePassword";
import Button from "../../../components/ui/Button";

function OtpForm() {
  const { otp, setOtp, onOtpSubmit, isLoading } = useRestorePassword();
  return (
    <form className="flex flex-col gap-5 justify-start items-start p-10 w-full max-w-lg bg-(--bg-dark) rounded-md">
      <AuthHeader
        title="Reset Your Password"
        description="Enter your email and we'll send you a 5-digit code to get you back into your account."
      ></AuthHeader>
      <OtpInput
        value={otp}
        onChange={(otp: string) => {
          setOtp(otp);
        }}
        numInputs={5}
        renderSeparator={<span> </span>}
        renderInput={(props) => <input {...props}></input>}
      ></OtpInput>
      <Button
        variant="dark"
        className="py-3 px-2 w-full flex justify-center text-base"
        disabled={isLoading}
        onClick={onOtpSubmit}
      >
        {isLoading ? "Verifying in..." : "Verify"}
      </Button>
    </form>
  );
}
export default OtpForm;
