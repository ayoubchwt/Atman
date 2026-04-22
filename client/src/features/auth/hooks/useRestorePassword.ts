import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const useRestorePassword = () => {
  const { recovery, setRecoveryEmail } = useAuthStore();
  const [otp, setOtp] = useState("");
  const { ForgotPassword, isLoading, error, message, verifyOtp } =
    useAuthStore();
  const navigate = useNavigate();
  const onForgotPasswordSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (recovery?.email) {
      await ForgotPassword(recovery.email);
      navigate("/auth/forgot/verify");
    }
  };
  const onOtpSubmit = async () => {
    await verifyOtp(otp);
  };
  return {
    recovery,
    setRecoveryEmail,
    onForgotPasswordSubmit,
    onOtpSubmit,
    isLoading,
    error,
    message,
    otp,
    setOtp,
  };
};
