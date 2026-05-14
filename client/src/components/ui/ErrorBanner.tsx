import { CircleAlert, X } from "lucide-react";
import Button from "./Button";
import { useError } from "../../features/dashboard/hooks/useError";
function ErrorBanner() {
  const { setError, error } = useError();
  return (
    <div className="absolute right-2 bottom-2 flex flex-col items-end justify-start bg-(--item-light) h-23 z-1000 rounded-xl shadow-xl border border-(--bg-dark) ">
      <Button variant="ghost" onClick={() => setError(null)}>
        <X className="h-5 w-5"></X>
      </Button>
      <div className="flex items-center justify-center gap-3 w-full px-5">
        <CircleAlert className="w-6 h-6 text-(--text)" />
        <p className="text-md text-(--text)">{error}</p>
      </div>
    </div>
  );
}
export default ErrorBanner;
