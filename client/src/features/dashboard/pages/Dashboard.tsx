import AppInitializer from "../../../components/AppInitializer";
import { useChatbox } from "../hooks/useChatbox";
import Chatbox from "../layout/Chatbox/Chatbox";
import Editor from "../layout/Editor";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/Sidebar/SideBar";

function Dashboard() {
  const { isChatboxOpen } = useChatbox();
  return (
    <AppInitializer>
      <div
        className={`relative grid h-screen w-full grid-rows-[auto_1fr] 
          grid-cols-1 [grid-template-areas:'navbar''editor']
          ${
            isChatboxOpen
              ? "md:grid-cols-[16%_4fr_17%] md:[grid-template-areas:'navbar_navbar_navbar''sidebar_editor_chatbox']"
              : "md:grid-cols-[16%_1fr] md:[grid-template-areas:'navbar_navbar''sidebar_editor']"
          }`}
      >
        <NavBar className="[grid-area:navbar]"></NavBar>

        <SideBar className="[grid-area:sidebar] hidden md:flex"></SideBar>

        <Editor className="[grid-area:editor] min-w-0 min-h-0"></Editor>

        {isChatboxOpen && (
          <Chatbox className="[grid-area:chatbox] hidden md:flex min-h-0"></Chatbox>
        )}
      </div>
    </AppInitializer>
  );
}
export default Dashboard;
