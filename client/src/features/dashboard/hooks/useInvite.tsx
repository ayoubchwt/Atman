import { useState } from "react";

export const useInvite = () => {
  const [role, setRole] = useState("");
  const onDelete = () => {
    // deletion logic
  };
  const onChange = (role: "editor" | "viewer") => {
    setRole(role);
    // update logix
  };
  return {
    onDelete,
    onChange,
    role,
  };
};
