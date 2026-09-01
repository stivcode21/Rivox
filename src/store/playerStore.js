import { create } from "zustand";
import { getSongById, getSongs } from "@/services/catalog";

let audio;

const getAudio = () => {
  if (!audio) {
    audio = new Audio();
    audio.preload = "metadata";
    audio.addEventListener("timeupdate", () => {
      usePlayerStore.setState({ currentTime: Math.floor(audio.currentTime) });
    });
    audio.addEventListener("ended", () => {
      usePlayerStore.getState().playNext();
    });
  }
  return audio;
};

const playCurrent = () => {
  const { currentSongId, volume } = usePlayerStore.getState();
  const song = getSongById(currentSongId);
  if (!song?.src) return;

  const player = getAudio();
  if (player.dataset.songId !== String(song.id)) {
    player.src = song.src;
    player.dataset.songId = String(song.id);
  }
  player.volume = volume;
  player.play().catch(() => {
    usePlayerStore.setState({ isPlaying: false });
  });
};

export const usePlayerStore = create((set, get) => ({
  currentSongId: null,
  queue: [],
  isPlaying: false,
  currentTime: 0,
  volume: 0.72,
  shuffle: false,
  repeat: false,

  hydrate: (songs) => {
    if (!songs?.length) return;
    const { currentSongId } = get();
    set({
      queue: songs,
      currentSongId: currentSongId ?? songs[0].id,
    });
  },

  playSong: (id, queue) => {
    set({
      currentSongId: id,
      queue: queue ?? get().queue,
      isPlaying: true,
      currentTime: 0,
    });
    playCurrent();
  },

  togglePlay: () => {
    const player = getAudio();
    const { isPlaying, currentSongId } = get();
    if (!currentSongId) return;

    if (isPlaying) {
      player.pause();
      set({ isPlaying: false });
      return;
    }

    set({ isPlaying: true });
    playCurrent();
  },

  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),

  toggleRepeat: () => set((state) => ({ repeat: !state.repeat })),

  setVolume: (volume) => {
    const player = getAudio();
    player.volume = volume;
    set({ volume });
  },

  setCurrentTime: (currentTime) => set({ currentTime }),

  playNext: () => {
    const songs = get().queue.length ? get().queue : getSongs();
    const { currentSongId, repeat } = get();
    if (!songs.length) return;

    if (repeat) {
      playCurrent();
      return;
    }

    const index = songs.findIndex((song) => song.id === currentSongId);
    const next = songs[(index + 1 + songs.length) % songs.length];
    if (!next) return;
    get().playSong(next.id, songs);
  },

  playPrevious: () => {
    const songs = get().queue.length ? get().queue : getSongs();
    const { currentSongId } = get();
    if (!songs.length) return;
    const index = songs.findIndex((song) => song.id === currentSongId);
    const previous = songs[(index - 1 + songs.length) % songs.length];
    if (!previous) return;
    get().playSong(previous.id, songs);
  },
}));
