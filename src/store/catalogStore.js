import { create } from "zustand";
import { catalogFilters } from "@/config/deezer";
import {
  fetchAlbumById,
  fetchArtistById,
  fetchChartAlbums,
  fetchChartArtists,
  fetchChartPlaylists,
  fetchChartTracks,
  fetchFeaturedArtist,
  fetchPlaylistById,
  fetchTrackById,
} from "@/services/deezer/catalog";

const mergeSongs = (current, incoming = []) => {
  const next = { ...current };
  incoming.forEach((song) => {
    if (song?.id != null) next[song.id] = song;
  });
  return next;
};

export const useCatalogStore = create((set, get) => ({
  status: "idle",
  error: null,
  songsByFilter: {},
  songsById: {},
  playlists: [],
  albums: [],
  artists: [],
  spotlight: null,
  collection: null,
  collectionStatus: "idle",
  collectionError: null,

  loadHome: async () => {
    if (get().status === "loading") return;
    set({ status: "loading", error: null });

    try {
      const defaultFilter = catalogFilters[0];
      const [songs, playlists, spotlight] = await Promise.all([
        fetchChartTracks(defaultFilter),
        fetchChartPlaylists(),
        fetchFeaturedArtist(),
      ]);

      set({
        status: "ready",
        songsByFilter: { [defaultFilter.id]: songs },
        playlists,
        spotlight,
        songsById: mergeSongs(
          {},
          [...songs, ...(spotlight?.topTracks ?? [])],
        ),
      });
    } catch (error) {
      set({
        status: "error",
        error: error.message || "No se pudo cargar Deezer",
      });
    }
  },

  loadFilter: async (filterId) => {
    const filter = catalogFilters.find((item) => item.id === filterId);
    if (!filter) return;
    if (get().songsByFilter[filterId]) return;

    const songs = await fetchChartTracks(filter);
    set({
      songsByFilter: { ...get().songsByFilter, [filterId]: songs },
      songsById: mergeSongs(get().songsById, songs),
    });
  },

  loadAlbums: async () => {
    if (get().albums.length) return;
    const albums = await fetchChartAlbums();
    set({ albums });
  },

  loadArtists: async () => {
    if (get().artists.length) return;
    const artists = await fetchChartArtists();
    set({ artists });
  },

  loadTracksByIds: async (ids = []) => {
    const missing = ids.filter((id) => !get().songsById[id]);
    if (!missing.length) return;
    const tracks = (
      await Promise.all(missing.map((id) => fetchTrackById(id).catch(() => null)))
    ).filter(Boolean);
    set({ songsById: mergeSongs(get().songsById, tracks) });
  },

  loadPlaylist: async (id) => {
    set({ collectionStatus: "loading", collectionError: null, collection: null });
    try {
      const { playlist, tracks } = await fetchPlaylistById(id);
      set({
        collection: { type: "playlist", entity: playlist, tracks, albums: [] },
        collectionStatus: "ready",
        songsById: mergeSongs(get().songsById, tracks),
      });
    } catch (error) {
      set({
        collectionStatus: "error",
        collectionError: error.message || "No se pudo cargar la playlist",
      });
    }
  },

  loadAlbum: async (id) => {
    set({ collectionStatus: "loading", collectionError: null, collection: null });
    try {
      const { album, tracks } = await fetchAlbumById(id);
      set({
        collection: { type: "album", entity: album, tracks, albums: [] },
        collectionStatus: "ready",
        songsById: mergeSongs(get().songsById, tracks),
      });
    } catch (error) {
      set({
        collectionStatus: "error",
        collectionError: error.message || "No se pudo cargar el álbum",
      });
    }
  },

  loadArtist: async (id) => {
    set({ collectionStatus: "loading", collectionError: null, collection: null });
    try {
      const { artist, tracks, albums } = await fetchArtistById(id);
      set({
        collection: { type: "artist", entity: artist, tracks, albums },
        collectionStatus: "ready",
        songsById: mergeSongs(get().songsById, tracks),
      });
    } catch (error) {
      set({
        collectionStatus: "error",
        collectionError: error.message || "No se pudo cargar el artista",
      });
    }
  },
}));
