import React from "react";
import { useUIStore } from "../../../store/useUIStore";
import { useFolders } from "../hooks/useFolders";
import { useNotes } from "../hooks/useNotes";
import FolderInput from "./FolderInput";
import FolderItem from "./FolderItem";
import NoteItem from "./NoteItem";

function FolderList() {
  const {
    folders,
    setActiveFolderId,
    handleAddFolder,
    handleUpdateFolder,
    isFolderView,
    isAddingFolder,
    setAddingFolder,
    extendedFolderId,
    setExtendedFolderId,
    folderNotes,
    updatingFolderId,
    setUpdatingFolderId,
  } = useFolders();
  const { activeNoteId, setActiveNote } = useNotes();
  const { setSideBarOpen } = useUIStore();

  return (
    <div
      className={`flex-col items-start gap-2 content-start w-full ${
        isFolderView ? "flex" : "hidden"
      }`}
    >
      <h1 className="text-sm text-(--text-light) font-semibold pl-2">
        FOLDERS
      </h1>
      <div className="flex flex-col gap-1 w-full">
        {isAddingFolder && (
          <FolderItem>
            <FolderInput
              onSubmit={handleAddFolder}
              onCancel={() => setAddingFolder(false)}
            />
          </FolderItem>
        )}

        {folders.map((folder) => (
          <React.Fragment key={folder.id}>
            {/* Added curly brace here */}
            {updatingFolderId !== folder.id ? (
              <div className="flex flex-col gap-1">
                <FolderItem
                  folderId={folder.id}
                  isSelected={extendedFolderId === folder.id}
                  onClick={() => {
                    setActiveFolderId(folder.id);
                    setExtendedFolderId(folder.id);
                  }}
                >
                  {folder.label}
                </FolderItem>

                {extendedFolderId === folder.id && (
                  <div className="flex flex-col gap-1 ml-3 pl-3 min-h-0 border-l border-(--bg-dark)">
                    {folderNotes.map((note) => (
                      <NoteItem
                        key={note.id}
                        noteId={note.id}
                        onClick={() => {
                          setActiveNote(note.id);
                          setSideBarOpen(false);
                        }}
                        isSelected={note.id === activeNoteId}
                      >
                        {note.title}
                      </NoteItem>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <FolderItem>
                <FolderInput
                  initialValue={folder.label}
                  onCancel={() => setUpdatingFolderId(null)}
                  onSubmit={async (label) => {
                    await handleUpdateFolder(folder.id, label);
                    setUpdatingFolderId(null);
                  }}
                />
              </FolderItem>
            )}
            {/* Added curly brace here */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default FolderList;
