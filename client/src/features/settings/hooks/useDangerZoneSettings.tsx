import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";

export const useDangerZoneSettings = () => {
  const userStore = useUserStore();
  const [otp, setOtp] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (!otpVisible) {
      console.log("am inside delete");
      try {
        await userStore.deleteUser();
        setOtpVisible(true);
      } catch {
        // error is handled by the global errror handler (check the userStore)
      }
    } else {
      if (otp.length < 5) return;
      await userStore.confirmDeleteUser({ code: otp });
      navigate("/auth/register");
    }
  };

  return {
    handleDelete,
    otp,
    setOtp,
    otpVisible,
  };
};
