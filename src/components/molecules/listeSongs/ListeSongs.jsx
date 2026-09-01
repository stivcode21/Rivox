import { Clock3, Ellipsis, Heart } from "lucide-react";
import { useState } from "react";
import styles from "./ListeSongs.module.css";
import { usePlayerStore } from "@/store/playerStore";
import { useLibraryStore } from "@/store/libraryStore";
import { formatDuration } from "@/utils/formatters";

const INITIAL_VISIBLE = 6;

const ListeSongs = ({ songs = [], showAll = false }) => {
  const [expanded, setExpanded] = useState(false);
  const currentSongId = usePlayerStore((state) => state.currentSongId);
  const playSong = usePlayerStore((state) => state.playSong);
  const likedSongIds = useLibraryStore((state) => state.likedSongIds);
  const toggleLiked = useLibraryStore((state) => state.toggleLiked);
  const visibleSongs = showAll || expanded ? songs : songs.slice(0, INITIAL_VISIBLE);

  return (
    <section className={styles.container}>
      <div className={styles.head}>
        <span>#</span>
        <span>Canción</span>
        <span>Artista</span>
        <span className={styles.clock}>
          <Clock3 />
        </span>
      </div>

      <ul className={styles.list}>
        {visibleSongs.map((song, index) => {
          const liked = likedSongIds.includes(song.id);
          const isCurrent = currentSongId === song.id;

          return (
            <li
              className={`${styles.item} ${isCurrent ? styles.current : ""}`}
              key={song.id}
              onClick={() => playSong(song.id, songs)}
            >
              <span className={styles.number}>{index + 1}</span>
              <div className={styles.description}>
                <img src={song.img} alt={song.title} className={styles.img} />
                <div>
                  <p className={styles.name}>
                    {song.title}
                    {song.explicit && <span className={styles.explicit}>E</span>}
                  </p>
                </div>
              </div>
              <p className={styles.artist}>{song.artist}</p>
              <span className={styles.duration}>{formatDuration(song.duration)}</span>
              <div className={styles.icons}>
                <button
                  type="button"
                  className={liked ? styles.liked : ""}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleLiked(song.id);
                  }}
                  aria-label="Favorito"
                >
                  <Heart className={styles.icon} />
                </button>
                <button type="button" aria-label="Más opciones">
                  <Ellipsis className={styles.icon} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {!showAll && songs.length > INITIAL_VISIBLE && (
        <button
          type="button"
          className={styles.more}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </section>
  );
};

export default ListeSongs;
