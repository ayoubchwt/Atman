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
    Promise.all([
      shareNoteStore.fetchNoteInvites(activeNoteId),
      // shareNoteStore.fetchCollaborators(activeNoteId),
    ]);
  };
  const onDelete = async (inviteId: string) => {
    if (inviteId) await shareNoteStore.deleteInvite(inviteId).then(() => {});
  };
  const onUpdate = async (role: string, inviteId: string) => {
    if (inviteId && (role === "editor" || role == "viewer"))
      await shareNoteStore.updateInviteRole({ role: role, id: inviteId });
  };
  const onAccept = async (inviteId: string) => {
    if (!inviteId) return;
    await shareNoteStore.updateInviteStatus({
      id: inviteId,
      status: "accepted",
    });
    await shareNoteStore.fetchSharedNotes();
  };
  const onDecline = async (inviteId: string) => {
    if (!inviteId) return;
    shareNoteStore.updateInviteStatus({ id: inviteId, status: "rejected" });
  };
  const removeCollaborator = async (userId: string) => {
    if (userId && activeNoteId)
      await shareNoteStore.removeCollaborator({
        guestId: userId,
        noteId: activeNoteId,
      });
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
    removeCollaborator,
    onDelete,
    onUpdate,
    onAccept,
    onDecline,
  };
};
