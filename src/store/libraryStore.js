import { create } from "zustand";

const STORAGE_KEY = "rivox-liked-ids";

const readLiked = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLiked = (ids) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
};

export const useLibraryStore = create((set, get) => ({
  likedSongIds: readLiked(),

  isLiked: (id) => get().likedSongIds.includes(id),

  toggleLiked: (id) =>
    set((state) => {
      const likedSongIds = state.likedSongIds.includes(id)
        ? state.likedSongIds.filter((songId) => songId !== id)
        : [...state.likedSongIds, id];
      writeLiked(likedSongIds);
      return { likedSongIds };
    }),
}));
