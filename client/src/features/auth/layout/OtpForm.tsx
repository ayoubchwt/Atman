import AuthHeader from "../components/common/AuthHeader";

function OtpForm() {
  return (
    <form className="flex flex-col gap-5 justify-start items-start p-10 w-full max-w-lg bg-(--bg-dark) rounded-md">
      <AuthHeader
        title="Reset Your Password"
        description="Enter your email and we'll send you a 5-digit code to get you back into your account."
      ></AuthHeader>
    </form>
  );
}
export default OtpForm;
