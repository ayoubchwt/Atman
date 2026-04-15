import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

export const useRegister = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const { isLoading, error, handleRegister, setMessage, setError } =
    useAuthStore();
  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords dosent match");
      return;
    }
    const result = await handleRegister({ name, email, password });
    if (result) {
      setMessage(`created a user with email ${email}`);
      navigate("/auth/login");
    }
  };
  return {
    error,
    setName,
    setEmail,
    setPassword,
    setPasswordConfirm,
    isLoading,
    onSubmit,
  };
};
