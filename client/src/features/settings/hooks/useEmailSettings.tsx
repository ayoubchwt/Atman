import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";
import { updateUserEmail } from "../../../services/UserService";

export const useEmailSettings = () => {
  const userStore = useUserStore();
  const [email, setEmail] = useState(userStore.userSettings?.email);
  const onSubmit = async () => {
    if (email) await updateUserEmail({ email: email });
  };
  return {
    email,
    setEmail,
    onSubmit,
  };
};
