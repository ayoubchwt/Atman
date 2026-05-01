import { useUIStore } from "../../../store/useUIStore";

export const useChatbox = () => {
  const { isChatboxOpen, setChatboxOpen } = useUIStore();

  return {
    isChatboxOpen,
    setChatboxOpen,
  };
};
