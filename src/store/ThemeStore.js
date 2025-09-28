import { create } from "zustand";

export const useThemeStore = create((set) => ({
  isDarkMode:
    localStorage.getItem("darkMode") === null
      ? true
      : localStorage.getItem("darkMode") === "true",

  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      document.body.className = newMode ? "dark-mode" : "light-mode";
      localStorage.setItem("darkMode", newMode);
      return { isDarkMode: newMode };
    }),
}));
