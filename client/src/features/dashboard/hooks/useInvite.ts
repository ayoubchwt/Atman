export const useInvite = () => {
  const onDelete = (inviteId: string) => {
    console.log(inviteId);
  };
  const onUpdate = (role: string, inviteId: string) => {
    console.log(role, inviteId);
  };
  return {
    onDelete,
    onUpdate,
  };
};
