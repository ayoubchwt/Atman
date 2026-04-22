import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

export const useRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { isLoading, error, message, handleRegister, resetStatus } =
    useAuthStore();
  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (password !== passwordConfirm) {
      setPasswordError("Passwords dosen't match");
      return;
    }
    const result = await handleRegister({ name, email, password });
    if (result) {
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setPasswordError("");
    }
  };
  return {
    error,
    passwordError,
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
