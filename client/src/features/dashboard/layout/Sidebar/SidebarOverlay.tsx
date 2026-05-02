import SideBar from "./SideBar";

function SidebarOverlay() {
  return (
    <div className="absolute w-full h-full z-11 justify-center items-center p-3 lg:hidden">
      <SideBar className="rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.6)]"></SideBar>
    </div>
  );
}
export default SidebarOverlay;
