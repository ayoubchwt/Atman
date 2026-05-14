import { useState } from "react";
import { useUserStore } from "../../../store/useUserStore";

export const useProfileSettings = () => {
  const userStore = useUserStore();
  const [userName, setUserName] = useState(userStore.userSettings?.name);
  const [userNameError, setUserNameError] = useState("");
  const [userNameSuccess, setUserNameSuccess] = useState("");
  const onSubmit = async () => {
    setUserNameError("");
    setUserNameSuccess("");
    if (!userName) {
      setUserNameError("Invalid user name format");
      return;
    }
    try {
      await userStore.updateUserName({ name: userName });
      setUserNameSuccess("User name has been updated successfully");
    } catch {
      //error is handled by the global errror handler (check the userStore)
    }
  };
  return {
    ...userStore,
    onSubmit,
    userName,
    userNameError,
    userNameSuccess,
    setUserName,
  };
};
