import { useState } from "react";

function FolderInput({
  onSubmit,
  onCancel,
  initialValue = "",
}: {
  onSubmit: (label: string) => Promise<void>;
  onCancel: () => void;
  initialValue?: string;
}) {
  const [tempLabel, setTempLabel] = useState(initialValue);
  const [isSubmitting, setSubmitting] = useState(false);
  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
      setTempLabel("");
    }
    if (e.key === "Enter" && tempLabel.trim()) {
      setSubmitting(true);
      try {
        await onSubmit(tempLabel);
      } finally {
        setTempLabel("");
        setSubmitting(false);
        onCancel();
      }
    }
  };
  return (
    <input
      autoFocus
      value={tempLabel}
      onChange={(e) => setTempLabel(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => !isSubmitting && onCancel()}
      placeholder="Folder name ..."
      disabled={isSubmitting}
    />
  );
}
export default FolderInput;
