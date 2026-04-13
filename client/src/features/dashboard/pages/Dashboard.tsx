import Editor from "../layout/Editor";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/SideBar";

function Dashboard() {
  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr] grid-cols-[320px_1fr]">

      <NavBar className="col-span-2 h-16 border-b border-(--bg-dark)" />
      
      <SideBar className="h-full border-r border-(--bg-dark) overflow-y-auto" />
      
      <main className="h-full overflow-y-auto bg-(--bg-light)">
        <Editor className="h-full" />
      </main>
    
    </div>
  );
}
export default Dashboard;
