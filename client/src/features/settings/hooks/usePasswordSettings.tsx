import { useState } from "react";

export const usePasswordSettings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const onSubmit = async () => {
    if (password !== passwordConfirm) return;
    console.log();
  };
  return {
    setOldPassword,
    setPassword,
    setPasswordConfirm,
    onSubmit,
  };
};
