import type { ReactNode } from "react";
import { useInitializeApp } from "../hooks/useInitializeApp";

function AppInitializer({ children }: { children: ReactNode }) {
  useInitializeApp();
  return <>{children}</>;
}
export default AppInitializer;
