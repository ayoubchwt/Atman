import { create } from "zustand";
import { persist } from "zustand/middleware";
interface themeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<themeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () =>
        set((state) => {
          const toggleValue = !state.isDark;
          document.documentElement.classList.toggle("dark", toggleValue);
          return {
            isDark: toggleValue,
          };
        }),
    }),
    {
      name: "Atman",
      onRehydrateStorage: () => (state) => {
        if (state?.isDark) {
          document.documentElement.classList.add("dark");
        }
      },
    },
  ),
);
