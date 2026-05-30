import { useState } from "react";
import { useShareStore } from "../../../store/useShareStore";
import { useNoteStore } from "../../../store/useNoteStore";

export const useShareNote = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [inviteMessage, setInviteMessage] = useState("");
  const [inviteError, setInviteError] = useState("");
  const [displayMode, setDispalyMode] = useState("collaborators");
  const shareNoteStore = useShareStore();
  const { activeNoteId } = useNoteStore();
  const onShare = async () => {
    setInviteError("");
    setInviteMessage("");
    if (!activeNoteId) return;
    if (role !== "editor" && role !== "viewer") return;
    if (!email) {
      setInviteError("Invalid Email Format");
      return;
    }
    try {
      await shareNoteStore.shareNote({
        guestEmail: email,
        role: role,
        noteId: activeNoteId,
      });
      setInviteMessage("Invitation sent successfully");
    } catch {
      // handled
    }
  };
  const fetchCollaboratorsAndInvites = async () => {
    if (!activeNoteId) return;
    await shareNoteStore.fetchNoteInvites(activeNoteId);
  };
  return {
    ...shareNoteStore,
    email,
    setEmail,
    setRole,
    role,
    onShare,
    inviteMessage,
    inviteError,
    displayMode,
    setDispalyMode,
    fetchCollaboratorsAndInvites,
  };
};
