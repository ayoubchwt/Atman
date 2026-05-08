import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";

export const useEmailSettings = () => {
  const userStore = useUserStore();
  const [email, setEmail] = useState(userStore.userSettings?.email);
  const onSubmit = async () => {        
    // update email logic will be here
  };
  return {
    email,
    setEmail,
    onSubmit,
  };
};
