import { BadgeCheck, Ellipsis, Play } from "lucide-react";
import styles from "./ArtistHero.module.css";
import { formatListeners } from "@/utils/formatters";
import { useCatalogStore } from "@/store/catalogStore";
import { usePlayerStore } from "@/store/playerStore";

const ArtistHero = ({ artist, rank }) => {
  const playSong = usePlayerStore((state) => state.playSong);
  const topTracks = useCatalogStore((state) => state.spotlight?.topTracks);

  if (!artist) return null;

  const handlePlay = () => {
    const [firstTrack] = topTracks ?? [];
    if (firstTrack) playSong(firstTrack.id, topTracks);
  };

  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${artist.image})` }}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        {rank ? <span className={styles.rank}>#{rank}</span> : null}

        <p className={styles.label}>Artista</p>
        <h1 className={styles.name}>
          {artist.name}
          {artist.verified && <BadgeCheck className={styles.badge} />}
        </h1>
        <p className={styles.listeners}>
          {formatListeners(artist.monthlyListeners)} fans
        </p>

        <div className={styles.actions}>
          <button type="button" className={styles.play} onClick={handlePlay}>
            <Play />
            Reproducir
          </button>
          <button type="button" className={styles.follow}>
            Seguir
          </button>
          <button type="button" className={styles.more} aria-label="Más opciones">
            <Ellipsis />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArtistHero;
