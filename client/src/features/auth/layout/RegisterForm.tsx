import Button from "../../../components/ui/Button";
import AuthHeader from "../components/common/AuthHeader";
import Input from "../components/common/Input";

function RegisterForm() {
  return (
    <div>
      <div>
        <AuthHeader></AuthHeader>
        <Input label="name" type="text"></Input>
        <Input label="email" type="email"></Input>
        <Input label="password" type="password"></Input>
        <Button variant="dark">Log in</Button>
      </div>
    </div>
  );
}
export default RegisterForm;
