import { X } from "lucide-react";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/ui/InputField";
import DropDown from "../../../components/ui/DropDown";
import AccessCard from "./AccessCard";

function ShareDialogue() {
  return (
    <div className="abolute relative flex flex-col justify-around w-100 h-100 bg-(--bg-dark) rounded-md shadow-xl p-4">
      <Button variant="ghost" className="absolute right-4 top-4">
        <X></X>
      </Button>
      <h1 className="text-xl text-(--text) font-serif">Share Note Title</h1>
      <p>Invite people by email and choose what they can do.</p>
      <div className="flex items-center justify-center gap-1">
        <InputField
          type="email"
          placeholder="name@example.com"
          onChange={() => ""}
        ></InputField>
        <DropDown></DropDown>
        <Button variant="dark">Invite</Button>
      </div>
      <h1>PEOPLE WITH ACCESS</h1>
      <AccessCard
        letter="E"
        name="Eclipse"
        email="eclipse@gmail.com"
        role="Owner"
      ></AccessCard>
    </div>
  );
}
export default ShareDialogue;
