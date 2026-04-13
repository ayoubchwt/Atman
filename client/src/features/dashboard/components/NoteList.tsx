import { useState } from "react";
import NoteItem from "./NoteItem";

function NoteList() {
  const notes = [
    { id: 1, text: "Buy some coffee beans" },
    { id: 2, text: "Buy some coffee beans" },
    { id: 3, text: "Buy some coffee beans" },
  ];
  const [selectedId, setSelectedId] = useState(1);
  return (
    <div className="flex flex-col items-start content start w-full">
      {notes.map((note) => {
        return (
          <NoteItem
            key={note.id}
            onClick={() => setSelectedId(note.id)}
            isSelected={note.id === selectedId}
          >
            {note.text}
          </NoteItem>
        );
      })}
    </div>
  );
}
export default NoteList;
