import { useState } from "react";
import { useChatboxStore } from "../../../store/useChatboxStore";
import { useNoteStore } from "../../../store/useNoteStore";
import { useUIStore } from "../../../store/useUIStore";

export const useChatbox = () => {
  const { isChatboxOpen, setChatboxOpen } = useUIStore();
  const { activeNoteId } = useNoteStore();
  const chatboxStore = useChatboxStore();
  const [prompt, setPrompt] = useState("");
  const handleSendMessage = async () => {
    if (activeNoteId && prompt)
      await chatboxStore.addMessage(activeNoteId, {
        text: prompt,
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
