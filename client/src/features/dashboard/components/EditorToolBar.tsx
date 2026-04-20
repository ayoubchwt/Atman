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
} from "lucide-react";
import { Editor } from "@tiptap/react";
import Button from "../../../components/ui/Button";

function EditorToolBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return <></>;
  }
  return (
    <div className="flex items-center gap-1 px-5 py-2 border border-(--bg-dark) bg-(--item-light) text-(--text)">
      <Button
        variant={editor.isActive("bold") ? "primary" : "ghostTinted"}
        className="p-2"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Button>

      <Button
        variant={editor.isActive("italic") ? "primary" : "ghostTinted"}
        className="p-2"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-(--bg-dark) mx-1"></div>

      <Button
        variant={
          editor.isActive("heading", { level: 1 }) ? "primary" : "ghostTinted"
        }
        className="p-2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="w-4 h-4" />
      </Button>

      <Button
        variant={
          editor.isActive("heading", { level: 2 }) ? "primary" : "ghostTinted"
        }
        className="p-2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-(--bg-dark) mx-1"></div>

      <Button
        variant={editor.isActive("bulletList") ? "primary" : "ghostTinted"}
        className="p-2"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </Button>

      <Button
        variant={editor.isActive("orderedList") ? "primary" : "ghostTinted"}
        className="p-2"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </Button>

      <Button
        variant={editor.isActive("blockquote") ? "primary" : "ghostTinted"}
        className="p-2"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-(--bg-dark) mx-1"></div>

      <div className="flex gap-1 ml-auto">
        <Button
          variant="ghostTinted"
          className="p-2"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="w-4 h-4" />
        </Button>

        <Button
          variant="ghostTinted"
          className="p-2"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
export default EditorToolBar;
