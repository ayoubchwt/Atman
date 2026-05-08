import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";

export const usePasswordSettings = () => {
  const userStore = useUserStore();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const onSubmit = async () => {
    if (password !== passwordConfirm) return;
    console.log(
      "stop crying : ",
      userStore.fetchUser,
      oldPassword,
      password,
      passwordConfirm,
    );
  };
  return {
    setOldPassword,
    setPassword,
    setPasswordConfirm,
    onSubmit,
  };
};
