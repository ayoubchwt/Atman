function AlertBox({ input, variant }: { input: string; variant: string }) {
  const className =
    variant === "success"
      ? "text-(--success) p-5 border border-(--success) rounded-md bg-(--ghostTinted-light)"
      : " text-(--failure) p-5 border border-(--failure) rounded-md bg-(--ghostTinted-light)";
  return (
    <div
      className={`w-full h-auto flex items-center justify-center ${className}`}
    >
      <p>{input}</p>
    </div>
  );
}
export default AlertBox;
