import AccessCard from "./AccessCard";

function AccessCardList() {
  return (
    <div className="flex flex-1 min-h-0 overflow-auto scrollbar-hide pt-2 gap-2 shrink flex-col w-full">
      <AccessCard
        letter="E"
        email="eclipse@gmail.com"
        name="eclipse"
        role="Owner"
      ></AccessCard>
      <AccessCard
        letter="E"
        email="eclipse@gmail.com"
        name="eclipse"
        role="Editor"
      ></AccessCard>{" "}
      <AccessCard
        letter="E"
        email="eclipse@gmail.com"
        name="eclipse"
        role="Viewer"
      ></AccessCard>
      <AccessCard
        letter="E"
        email="eclipse@gmail.com"
        name="eclipse"
        role="Viewer"
      ></AccessCard>{" "}
      <AccessCard
        letter="E"
        email="eclipse@gmail.com"
        name="eclipse"
        role="Viewer"
      ></AccessCard>{" "}
      <AccessCard
        letter="E"
        email="eclipse@gmail.com"
        name="eclipse"
        role="Viewer"
      ></AccessCard>
    </div>
  );
}
export default AccessCardList;
