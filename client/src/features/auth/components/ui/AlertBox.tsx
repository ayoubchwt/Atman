function AlertBox({ input, className }: { input: string; className?: string }) {
  return (
    <div
      className={`w-full h-auto flex items-center justify-center ${className}`}
    >
      <p>{input}</p>
    </div>
  );
}
export default AlertBox;
