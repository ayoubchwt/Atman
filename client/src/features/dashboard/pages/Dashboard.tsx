import ErrorBanner from "../../../components/ui/ErrorBanner";
import ShareDialogue from "../components/ShareDialogue";
import { useChatbox } from "../hooks/useChatbox";
import { useError } from "../hooks/useError";
import Chatbox from "../layout/Chatbox/Chatbox";
import Editor from "../layout/Editor";
import NavBar from "../layout/NavBar";
import SideBar from "../layout/Sidebar/SideBar";
function Dashboard() {
  const { isChatboxOpen } = useChatbox();
  const { error } = useError();
  return (
    <div
      className={`relative grid h-screen w-full grid-rows-[auto_1fr] 
          grid-cols-1 [grid-template-areas:'navbar''editor']
          ${
            isChatboxOpen
              ? "md:grid-cols-[16%_1fr_minmax(200px,300px)] md:[grid-template-areas:'navbar_navbar_navbar''sidebar_editor_chatbox']"
              : "md:grid-cols-[16%_1fr] md:[grid-template-areas:'navbar_navbar''sidebar_editor']"
          }`}
    >
      <NavBar className="[grid-area:navbar]"></NavBar>

      <SideBar className="[grid-area:sidebar] hidden md:flex"></SideBar>

      <Editor className="[grid-area:editor] min-w-0 min-h-0"></Editor>

      {isChatboxOpen && (
        <Chatbox className="[grid-area:chatbox] hidden md:flex min-h-0"></Chatbox>
      )}
      <ShareDialogue></ShareDialogue>
      {error && <ErrorBanner></ErrorBanner>}
    </div>
  );
}
export default Dashboard;
