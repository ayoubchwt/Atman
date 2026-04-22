import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const useRestorePassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const { forgotPassword, isLoading, error, message, verifyOtp } =
    useAuthStore();
  const navigate = useNavigate();
  const onForgotPasswordSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (email) {
      const result = await forgotPassword(email);
      if (result) {
        navigate("/auth/forgot/verify");
      }
    }
  };
  const onOtpSubmit = async () => {
    const result = await verifyOtp(otp);
    if (result) {
      navigate("/auth/forgot/reset");
    }
  };
  return {
    email,
    setEmail,
    onForgotPasswordSubmit,
    onOtpSubmit,
    isLoading,
    error,
    message,
    otp,
    setOtp,
  };
};
