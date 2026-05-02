import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Sparkles,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import Button from "../../../components/ui/Button";
import { useChatbox } from "../hooks/useChatbox";

function EditorToolBar({ editor }: { editor: Editor | null }) {
  const { setChatboxOpen, isChatboxOpen } = useChatbox();
  if (!editor) {
    return <></>;
  }
  return (
    <div className="flex items-center px-5 h-11 border-t border-b border-(--bg-dark) bg-(--item-light) text-(--text) md:px- md:gap-1">
      <Button
        variant={editor.isActive("bold") ? "primary" : "ghostTinted"}
        className="p-2 rounded-md"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Button>

      <Button
        variant={editor.isActive("italic") ? "primary" : "ghostTinted"}
        className="p-2 rounded-md"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-(--bg-dark) mx-1"></div>

      <Button
        variant={
          editor.isActive("heading", { level: 1 }) ? "primary" : "ghostTinted"
        }
        className="p-2 rounded-md"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="w-4 h-4" />
      </Button>

      <Button
        variant={
          editor.isActive("heading", { level: 2 }) ? "primary" : "ghostTinted"
        }
        className="p-2 rounded-md"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-(--bg-dark) mx-1"></div>

      <Button
        variant={editor.isActive("bulletList") ? "primary" : "ghostTinted"}
        className="p-2 rounded-md"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </Button>

      <Button
        variant={editor.isActive("orderedList") ? "primary" : "ghostTinted"}
        className="p-2 rounded-md"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </Button>

      <Button
        variant={editor.isActive("blockquote") ? "primary" : "ghostTinted"}
        className="p-2 rounded-md"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-(--bg-dark) mx-1"></div>
      <Button
        variant="ghostTinted"
        className="p-2 rounded-md"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="w-4 h-4" />
      </Button>
      <Button
        variant="ghostTinted"
        className="p-2 rounded-md"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-(--bg-dark) mx-1"></div>
      <div className="flex gap-1 ml-auto">
        {!isChatboxOpen && (
          <Button
            variant="ghostTinted"
            className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-md z-11"
            onClick={() => setChatboxOpen(true)}
          >
            <Sparkles className="w-5 h-5"></Sparkles>{" "}
            <span className="hidden md:block">Ask AI</span>
          </Button>
        )}
      </div>
    </div>
  );
}
export default EditorToolBar;
