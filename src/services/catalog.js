import { catalogFilters } from "@/config/deezer";
import { Sections } from "@/data/sections";
import { currentUser } from "@/data/user";
import { useCatalogStore } from "@/store/catalogStore";

export const getFilters = () => catalogFilters;

export const getNavSections = () => Sections;

export const getCurrentUser = () => currentUser;

export const getSongs = () => {
  const { songsByFilter, songsById } = useCatalogStore.getState();
  const firstFilter = Object.values(songsByFilter)[0];
  return firstFilter ?? Object.values(songsById);
};

export const getSongById = (id) => useCatalogStore.getState().songsById[id] ?? null;
