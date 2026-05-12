import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";

export const useEmailSettings = () => {
  const userStore = useUserStore();
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(userStore.userSettings?.email);
  const onSubmit = async () => {
    if (!email) return;
    if (!otpVisible) {
      userStore.updateUserEmail();
      setOtpVisible(true);
      return;
    }
    console.log("verifying otp ...");
  };
  return {
    email,
    setEmail,
    onSubmit,
    otpVisible,
    otp,
    setOtp,
  };
};
