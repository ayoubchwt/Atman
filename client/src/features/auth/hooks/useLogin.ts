import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, isLoading, error, isAuthenticated } = useAuthStore();
  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await handleLogin({ email, password });
    if (isAuthenticated) navigate("/home");
  };
  return {
    setEmail,
    setPassword,
    isLoading,
    error,
    onSubmit,
  };
};
