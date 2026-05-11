import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";

export const usePasswordSettings = () => {
  const userStore = useUserStore();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const onSubmit = async () => {
    if (password !== passwordConfirm) {
      setPasswordError("Passwords doesn't match");
      return;
    }
    await userStore.updateUserPassword({
      oldPassword: oldPassword,
      newPassword: password,
    });
    setPasswordError("");
  };
  return {
    setOldPassword,
    setPassword,
    setPasswordConfirm,
    passwordError,
    onSubmit,
  };
};
