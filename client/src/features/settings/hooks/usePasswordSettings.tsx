import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";

export const usePasswordSettings = () => {
  const userStore = useUserStore();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const onSubmit = async () => {
    setPasswordError("");
    setPasswordSuccess("");
    if (password !== passwordConfirm) {
      setPasswordError("Passwords doesn't match");
      return;
    }
    try {
      await userStore.updateUserPassword({
        oldPassword: oldPassword,
        newPassword: password,
      });
      setPasswordSuccess("Password has been updated successfully");
      setPasswordError("");
    } catch {
      //error is handled by the global errror handler (check the userStore)
    }
  };

  return {
    setOldPassword,
    setPassword,
    setPasswordConfirm,
    passwordError,
    passwordSuccess,
    onSubmit,
  };
};
