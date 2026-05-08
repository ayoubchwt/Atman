import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";

export const useProfileSettings = () => {
  const userStore = useUserStore();
  const [userName, setUserName] = useState(userStore.userSettings?.name);
  const onSubmit = async () => {
    // update username logic will be here
  };
  return {
    onSubmit,
    userName,
    setUserName,
  };
};
