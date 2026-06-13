import Button from "../../../components/ui/Button";

function ShareFilter({
  setDisplayMode,
  displayMode,
}: {
  setDisplayMode: (mode: string) => void;
  displayMode: string;
}) {
  return (
    <div className="flex items-center justify-center w-full bg-(--item-light) rounded-md p-1.5">
      <Button
        variant={displayMode === "collaborators" ? "ghostStatic" : "ghost"}
        className="w-full p-1 rounded-md"
        onClick={() => setDisplayMode("collaborators")}
      >
        Collaborators
      </Button>
      <Button
        variant={displayMode === "invites" ? "ghostStatic" : "ghost"}
        className="w-full p-1 rounded-md"
        onClick={() => setDisplayMode("invites")}
      >
        Invites
      </Button>
    </div>
  );
}
export default ShareFilter;
