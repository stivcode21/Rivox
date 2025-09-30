import { create } from "zustand";

export const useStateSection = create((set) => ({
  currentSection: "Home",
  setCurrentSection: (section) => set({ currentSection: section }),
}));
