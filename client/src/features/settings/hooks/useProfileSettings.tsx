import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";

export const useProfileSettings = () => {
  const userStore = useUserStore();
  const [userName, setUserName] = useState(userStore.userSettings?.name);
  const onSubmit = async () => {
    if (userName) await userStore.updateUserName({ name: userName });
  };
  return {
    ...userStore,
    onSubmit,
    userName,
    setUserName,
  };
};
