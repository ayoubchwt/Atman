import Button from "../../../components/ui/Button";
import AuthHeader from "../components/common/AuthHeader";
import Input from "../components/common/Input";

function LoginForm() {
  return (
    <div>
      <AuthHeader></AuthHeader>
      <Input label="email" type="email"></Input>
      <Input label="password" type="password"></Input>
      <Button variant="dark">Log in</Button>
    </div>
  );
}
export default LoginForm;
