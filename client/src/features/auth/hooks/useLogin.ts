import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { getNotes } from "../../../services/NoteService";
import { useNoteStore } from "../../dashboard/store/useNoteStore";
export const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { clearStore, setNotes } = useNoteStore();
  const { handleLogin, isLoading, error, resetStatus } = useAuthStore();
  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const result = await handleLogin({ email, password });
    if (result) {
      clearStore();
      try {
        const notes = await getNotes();
        setNotes(notes);
      } catch (error) {
        console.log("error fetching notes", error);
      }
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
