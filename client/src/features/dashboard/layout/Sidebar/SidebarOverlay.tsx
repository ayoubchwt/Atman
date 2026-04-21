import SideBar from "./SideBar";

function SidebarOverlay({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return <></>;
  return (
    <div className="absolute w-full h-full justify-center items-center p-3 lg:hidden">
      <SideBar className="rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.6)]"></SideBar>
    </div>
  );
}
export default SidebarOverlay;
