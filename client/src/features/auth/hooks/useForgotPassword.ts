import React, { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { ForgetPassword, isLoading, error, message } = useAuthStore();
  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await ForgetPassword(email);
  };
  return {
    email,
    setEmail,
    onSubmit,
    isLoading,
    error,
    message,
  };
};
