import { X } from "lucide-react";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/ui/InputField";
import DropDown from "../../../components/ui/DropDown";
import AccessCardList from "./AccessCardList";
import { useUIStore } from "../../../store/useUIStore";

function ShareDialogue() {
  const { setShareOpen } = useUIStore();
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-110 h-80 bg-(--bg) rounded-xl shadow-xl border border-(--bg-dark) p-4 z-100">
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
            placeholder="name@example.com"
            onChange={() => ""}
          ></InputField>
          <DropDown></DropDown>
          <Button variant="dark">Invite</Button>
        </div>
        <h1 className="text-sm font-semibold text-(--text-light)">
          PEOPLE WITH ACCESS
        </h1>
      </div>
      <AccessCardList></AccessCardList>
    </div>
  );
}
export default ShareDialogue;
