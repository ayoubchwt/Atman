import { useState } from "react";
import { useChatboxStore } from "../../../store/useChatboxStore";
import { useNoteStore } from "../../../store/useNoteStore";
import { useUIStore } from "../../../store/useUIStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export const useChatbox = () => {
  const { isChatboxOpen, setChatboxOpen } = useUIStore();
  const { isAuthenticated } = useAuthStore();
  const { activeNoteId } = useNoteStore();
  const chatboxStore = useChatboxStore();
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const handleSendMessage = async (message?: string) => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
    const textToSend = message || prompt;
    console.log("Text to send", textToSend);
    if (!activeNoteId || !textToSend.trim()) return;
    setPrompt("");
    await chatboxStore.addMessage(activeNoteId, {
      id: crypto.randomUUID(),
      text: textToSend,
      sender: "user",
    });
  };
  return {
    ...chatboxStore,
    handleSendMessage,
    isChatboxOpen,
    setChatboxOpen,
    prompt,
    setPrompt,
  };
};
