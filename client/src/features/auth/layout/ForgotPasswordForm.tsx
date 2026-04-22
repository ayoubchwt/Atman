import Button from "../../../components/ui/Button";
import AuthHeader from "../components/common/AuthHeader";
import Input from "../components/common/Input";
import AlertBox from "../components/ui/AlertBox";
import { useForgotPassword } from "../hooks/useForgotPassword";

function ForgotPasswordForm() {
  const { email, setEmail, onSubmit, isLoading, error, message } =
    useForgotPassword();
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 justify-start items-start p-10 w-full max-w-lg bg-(--bg-dark) rounded-md"
    >
      <AuthHeader
        title="Reset Your Password"
        description="Enter your email and we'll send you a 5-digit code to get you back into your account."
      ></AuthHeader>
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      {error && <AlertBox input={error} variant="failure"></AlertBox>}
      {message && <AlertBox input={message} variant="success"></AlertBox>}
      <Button
        variant="dark"
        className="py-3 px-2 w-full flex justify-center text-base"
        disabled={isLoading}
      >
        {isLoading ? "Sending ..." : "Send"}
      </Button>
    </form>
  );
}
export default ForgotPasswordForm;
