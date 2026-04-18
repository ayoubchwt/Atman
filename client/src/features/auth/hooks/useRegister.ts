import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

export const useRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const {
    isLoading,
    error,
    message,
    handleRegister,
    setMessage,
    setError,
    resetStatus,
  } = useAuthStore();
  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords dosent match");
      return;
    }
    const result = await handleRegister({ name, email, password });
    if (result) {
      setMessage(`created a user with email ${email}`);
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    }
  };
  return {
    error,
    message,
    setName,
    name,
    setEmail,
    email,
    setPassword,
    password,
    setPasswordConfirm,
    passwordConfirm,
    isLoading,
    onSubmit,
    resetStatus,
  };
};
