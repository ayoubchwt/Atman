import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const useRestorePassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {
    forgotPassword,
    verifyOtp,
    resetPassword,
    isLoading,
    error,
    message,
    resetStatus,
  } = useAuthStore();
  const navigate = useNavigate();
  const onForgotPasswordSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (email) {
      const result = await forgotPassword(email);
      if (result) {
        navigate("/auth/forgot/verify");
        resetStatus();
      }
    }
  };
  const onOtpSubmit = async () => {
    const result = await verifyOtp(otp);
    if (result) {
      navigate("/auth/forgot/reset");
      resetStatus();
    }
  };
  const onResetPasswordSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (password !== passwordConfirm) {
      setPasswordError("Passwords dosen't match");
      return;
    }
    await resetPassword(password);
  };
  return {
    email,
    setEmail,
    onForgotPasswordSubmit,
    onOtpSubmit,
    onResetPasswordSubmit,
    isLoading,
    error,
    passwordError,
    password,
    passwordConfirm,
    setPassword,
    setPasswordConfirm,
    message,
    otp,
    setOtp,
  };
};
