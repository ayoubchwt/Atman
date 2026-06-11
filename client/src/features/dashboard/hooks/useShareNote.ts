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
  const noteStore = useNoteStore();
  const { activeNote } = useNoteStore();
  const onShare = async () => {
    setInviteError("");
    setInviteMessage("");
    if (!activeNote) return;
    if (role !== "editor" && role !== "viewer") return;
    if (!email) {
      setInviteError("Invalid Email Format");
      return;
    }
    try {
      await shareNoteStore.shareNote({
        guestEmail: email,
        role: role,
        noteId: activeNote.id,
      });
      setInviteMessage("Invitation sent successfully");
    } catch {
      // handled
    }
  };
  const fetchCollaboratorsAndInvites = async () => {
    if (!activeNote) return;
    Promise.all([
      shareNoteStore.fetchNoteInvites(activeNote.id),
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
    if (userId && activeNote)
      await shareNoteStore.removeCollaborator({
        guestId: userId,
        noteId: activeNote.id,
      });
  };
  const fetchCollaboratorsAndSharedContent = async (noteId: string) => {
    await shareNoteStore.fetchCollaborators(noteId);
    console.log("should be fetching ...");
    if (useShareStore.getState().collaborators.length > 1)
      console.log("am Fetching ...");
    noteStore.fetchNote(noteId);
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
    fetchCollaboratorsAndSharedContent,
    removeCollaborator,
    onDelete,
    onUpdate,
    onAccept,
    onDecline,
  };
};
