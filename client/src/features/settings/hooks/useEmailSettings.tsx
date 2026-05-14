import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";

export const useEmailSettings = () => {
  const userStore = useUserStore();
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [email, setEmail] = useState(userStore.userSettings?.email);
  const onSubmit = async () => {
    setEmailError("");
    setEmailSuccess("");
    if (!email) return;
    try {
      if (!otpVisible) {
        await userStore.updateUserEmail();
        setOtpVisible(true);
        return;
      }
      if (otp.length >= 5) {
        await userStore.confirmUpdateUserEmail({ email: email, code: otp });
        setOtpVisible(false);
        setEmailSuccess("Email has been updated successfully");
      } else {
        setEmailError("Invalid code format");
      }
    } catch {
      //error is handled by the global errror handler (check the userStore)
    }
  };
  return {
    email,
    setEmail,
    emailError,
    emailSuccess,
    onSubmit,
    otpVisible,
    otp,
    setOtp,
  };
};
