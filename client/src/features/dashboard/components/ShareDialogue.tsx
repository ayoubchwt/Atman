import { X } from "lucide-react";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/ui/InputField";
import DropDown from "../../../components/ui/DropDown";
import AccessCardList from "./AccessCardList";
import { useUIStore } from "../../../store/useUIStore";
import type { DropDownOption } from "../../../components/ui/DropDown";
import { useShareNote } from "../hooks/useShareNote";
import AlertBox from "../../../components/ui/AlertBox";
import ShareFilter from "./ShareFilter";
import InviteCardList from "./InviteCardList";

function ShareDialogue() {
  const { setShareOpen } = useUIStore();
  const {
    email,
    setEmail,
    setRole,
    role,
    onShare,
    inviteMessage,
    inviteError,
    displayMode,
    setDispalyMode,
  } = useShareNote();
  const options: DropDownOption[] = [
    {
      label: "Editor",
      value: "editor",
    },
    {
      label: "Viewer",
      value: "viewer",
    },
  ];
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1 md:w-110 w-95 h-90 bg-(--bg) rounded-xl shadow-xl border border-(--bg-dark) p-4 z-100">
      <Button
        variant="ghost"
        className="absolute right-4 top-4"
        onClick={() => setShareOpen(false)}
      >
        <X className="w-5 h-5"></X>
      </Button>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl text-(--text) font-serif font-semibold">
            Share Note Title
          </h1>
          <p className="text-sm text-(--text-light)">
            Invite people by email and choose what they can do.
          </p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <InputField
            type="email"
            value={email}
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          ></InputField>
          <DropDown
            className="h-full w-60"
            options={options}
            value={role}
            setValue={setRole}
          ></DropDown>
          <Button variant="dark" onClick={onShare}>
            Invite
          </Button>
        </div>
        {inviteMessage && (
          <AlertBox variant="success" input={inviteMessage}></AlertBox>
        )}
        {inviteError && (
          <AlertBox variant="failure" input={inviteError}></AlertBox>
        )}
        <ShareFilter
          setDisplayMode={setDispalyMode}
          displayMode={displayMode}
        ></ShareFilter>
      </div>
      {displayMode === "collaborators" ? (
        <AccessCardList></AccessCardList>
      ) : (
        <InviteCardList></InviteCardList>
      )}
    </div>
  );
}
export default ShareDialogue;
