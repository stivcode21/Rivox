import {
  Heart,
  ListMusic,
  Maximize2,
  MonitorSpeaker,
  Pause,
  Play,
  Plus,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import styles from "./Player.module.css";
import { usePlayerStore } from "@/store/playerStore";
import { useLibraryStore } from "@/store/libraryStore";
import { useCatalogStore } from "@/store/catalogStore";
import { formatDuration } from "@/utils/formatters";

const Player = () => {
  const currentSongId = usePlayerStore((state) => state.currentSongId);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const volume = usePlayerStore((state) => state.volume);
  const shuffle = usePlayerStore((state) => state.shuffle);
  const repeat = usePlayerStore((state) => state.repeat);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const playNext = usePlayerStore((state) => state.playNext);
  const playPrevious = usePlayerStore((state) => state.playPrevious);
  const toggleShuffle = usePlayerStore((state) => state.toggleShuffle);
  const toggleRepeat = usePlayerStore((state) => state.toggleRepeat);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const toggleLiked = useLibraryStore((state) => state.toggleLiked);
  const likedSongIds = useLibraryStore((state) => state.likedSongIds);
  const songsById = useCatalogStore((state) => state.songsById);

  const song = songsById[currentSongId];
  if (!song) {
    return <section className={styles.container} />;
  }

  const liked = likedSongIds.includes(song.id);
  const progress = song.duration ? (currentTime / song.duration) * 100 : 0;

  return (
    <section className={styles.container}>
      <div className={styles.track}>
        <img src={song.img} alt={song.title} />
        <div className={styles.meta}>
          <strong>{song.title}</strong>
          <span>{song.artist}</span>
        </div>
        <button
          type="button"
          className={`${styles.iconButton} ${liked ? styles.liked : ""}`}
          onClick={() => toggleLiked(song.id)}
          aria-label="Favorito"
        >
          <Heart />
        </button>
        <button type="button" className={styles.iconButton} aria-label="Agregar">
          <Plus />
        </button>
      </div>

      <div className={styles.center}>
        <div className={styles.controls}>
          <button
            type="button"
            className={`${styles.iconButton} ${shuffle ? styles.active : ""}`}
            onClick={toggleShuffle}
            aria-label="Aleatorio"
          >
            <Shuffle />
          </button>
          <button type="button" className={styles.iconButton} onClick={playPrevious} aria-label="Anterior">
            <SkipBack />
          </button>
          <button type="button" className={styles.play} onClick={togglePlay} aria-label={isPlaying ? "Pausar" : "Reproducir"}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button type="button" className={styles.iconButton} onClick={playNext} aria-label="Siguiente">
            <SkipForward />
          </button>
          <button
            type="button"
            className={`${styles.iconButton} ${repeat ? styles.active : ""}`}
            onClick={toggleRepeat}
            aria-label="Repetir"
          >
            <Repeat />
          </button>
        </div>

        <div className={styles.progress}>
          <span>{formatDuration(currentTime)}</span>
          <div className={styles.bar}>
            <div className={styles.fill} style={{ width: `${progress}%` }} />
          </div>
          <span>{formatDuration(song.duration)}</span>
        </div>
      </div>

      <div className={styles.extras}>
        <button type="button" className={styles.iconButton} aria-label="Cola">
          <ListMusic />
        </button>
        <button type="button" className={styles.iconButton} aria-label="Dispositivo">
          <MonitorSpeaker />
        </button>
        <div className={styles.volume}>
          <Volume2 />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
            aria-label="Volumen"
          />
        </div>
        <button type="button" className={styles.iconButton} aria-label="Pantalla completa">
          <Maximize2 />
        </button>
      </div>
    </section>
  );
};

export default Player;
