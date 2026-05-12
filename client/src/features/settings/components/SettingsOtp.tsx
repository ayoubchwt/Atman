import OtpInput from "react-otp-input";

function SettingsOtp({
  code,
  setCode,
  message,
}: {
  code: string;
  setCode: (otp: string) => void;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <h1 className="text-sm text-(--text-light)">{message}</h1>
      <OtpInput
        value={code}
        onChange={(otp: string) => {
          setCode(otp);
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
  );
}
export default SettingsOtp;
