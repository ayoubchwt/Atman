import { useEffect } from "react";
import Router from "./app/router";
import { useAuthStore } from "./store/useAuthStore";
function App() {
  const { handleRefresh } = useAuthStore();
  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);
  return <Router></Router>;
}
export default App;
