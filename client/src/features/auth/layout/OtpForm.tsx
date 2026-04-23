import AuthHeader from "../components/common/AuthHeader";
import OtpInput from "react-otp-input";
import { useRestorePassword } from "../hooks/useRestorePassword";
import Button from "../../../components/ui/Button";
import AlertBox from "../components/ui/AlertBox";

function OtpForm() {
  const { otp, setOtp, onOtpSubmit, isLoading, error } = useRestorePassword();
  return (
    <form className="flex flex-col gap-5 justify-start items-start p-10 w-full max-w-lg bg-(--bg-dark) rounded-md">
      <AuthHeader
        title="Verify Your Identity"
        description="We've sent a secure 5-digit code to your email. Enter it below to continue."
      ></AuthHeader>
      <div className="w-full flex justify-center">
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
      </div>
      {error && <AlertBox input={error} variant="failure"></AlertBox>}
      <Button
        variant="dark"
        className="py-3 px-2 w-full flex justify-center text-base rounded-md"
        disabled={isLoading}
        onClick={onOtpSubmit}
      >
        {isLoading ? "Verifying in..." : "Verify"}
      </Button>
    </form>
  );
}
export default OtpForm;
