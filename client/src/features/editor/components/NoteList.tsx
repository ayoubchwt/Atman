import NoteItem from "./NoteItem";

function NoteList() {
  const notes = [
    { id: 1, text: "Buy some coffee beans" },
    { id: 2, text: "Buy some coffee beans" },
    { id: 3, text: "Buy some coffee beans" },
  ];
  return (
    <div className="flex flex-col items-start content start w-full">
      {notes.map((note) => {
        return <NoteItem key={note.id}>{note.text}</NoteItem>;
      })}
    </div>
  );
}
export default NoteList;
