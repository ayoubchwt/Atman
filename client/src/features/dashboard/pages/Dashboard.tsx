import Editor from "../layout/Editor";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";

function Dashboard() {
  return (
    <>
      <div className="grid h-full w-full grid-rows-[auto_1fr] grid-cols-[minmax(150px,1fr)_5fr] [grid-template-areas:'navbar_navbar''sidebar_editor']">
        <NavBar className="[grid-area:navbar]"></NavBar>

        <SideBar className="[grid-area:sidebar]"></SideBar>

        <Editor className="[grid-area:editor]"></Editor>
      </div>
    </>
  );
}
export default Dashboard;
