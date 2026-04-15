import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, isLoading, error, message, user } = useAuthStore();
  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const result = await handleLogin({ email, password });
    if (result) {
      navigate("/home");
      console.info("JWT TOKEN", user?.accessToken, "for user :", user?.email);
    }
  };
  return {
    setEmail,
    setPassword,
    isLoading,
    error,
    onSubmit,
    message,
  };
};
