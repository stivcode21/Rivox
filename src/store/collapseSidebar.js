import { create } from "zustand";

export const useCollapseSidebar = create((set) => ({
  currentState: true,
  setCurrentState: (state) => set({ currentState: state }),
}));
