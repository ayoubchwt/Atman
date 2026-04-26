import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNoteStore } from "../../../store/useNoteStore";
import { useFolderStore } from "../../../store/useFolderStore";
export const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { clearNoteStore } = useNoteStore();
  const { clearFolderStore } = useFolderStore();
  const { handleLogin, isLoading, error, resetStatus } = useAuthStore();
  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const result = await handleLogin({ email, password });
    if (result) {
      clearNoteStore();
      clearFolderStore();
      navigate("/home");
    }
  };
  return {
    setEmail,
    setPassword,
    isLoading,
    error,
    onSubmit,
    resetStatus,
  };
};
