import AppInitializer from "../../../components/AppInitializer";
import { useChatbox } from "../hooks/useChatbox";
import Chatbox from "../layout/Chatbox";
import Editor from "../layout/Editor";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/Sidebar/SideBar";

function Dashboard() {
  const { isChatboxOpen } = useChatbox();
  return (
    <AppInitializer>
      <div
        className={`relative grid h-screen w-full grid-rows-[auto_1fr]
          ${
            isChatboxOpen
              ? "grid-cols-[16%_4fr_minmax(250px,1.2fr)] [grid-template-areas:'navbar_navbar''editor_editor'] md:[grid-template-areas:'navbar_navbar_navbar''sidebar_editor_chatbox']"
              : "grid-cols-[16%_5fr] [grid-template-areas:'navbar_navbar''editor_editor'] md:[grid-template-areas:'navbar_navbar''sidebar_editor']"
          }`}
      >
        <NavBar className="[grid-area:navbar]"></NavBar>

        <SideBar className="[grid-area:sidebar] hidden md:flex"></SideBar>

        <Editor className="[grid-area:editor] min-w-0"></Editor>

        {isChatboxOpen && <Chatbox className="[grid-area:chatbox] hidden md:flex"></Chatbox>}
      </div>
    </AppInitializer>
  );
}
export default Dashboard;
