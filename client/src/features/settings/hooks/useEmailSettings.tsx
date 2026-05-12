import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";

export const useEmailSettings = () => {
  const userStore = useUserStore();
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState(userStore.userSettings?.email);
  const onSubmit = async () => {
    if (!email) return;
    if (!otpVisible) {
      userStore.updateUserEmail();
      setOtpVisible(true);
      return;
    }
    if (otp) {
      await userStore.confirmUpdateUserEmail({ email: email, code: otp });
    } else {
      setEmailError("Verify the otp code");
    }
  };
  return {
    email,
    setEmail,
    onSubmit,
    otpVisible,
    otp,
    setOtp,
    emailError,
  };
};
