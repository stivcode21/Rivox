import { Play } from "lucide-react";
import styles from "./CollectionHero.module.css";

const CollectionHero = ({
  type,
  image,
  title,
  subtitle,
  meta,
  round = false,
  onPlay,
}) => (
  <section className={styles.hero}>
    <img src={image} alt={title} className={round ? styles.round : styles.cover} />
    <div className={styles.content}>
      <p className={styles.type}>{type}</p>
      <h1>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      {meta ? <p className={styles.meta}>{meta}</p> : null}
      {onPlay ? (
        <button type="button" className={styles.play} onClick={onPlay}>
          <Play />
          Reproducir
        </button>
      ) : null}
    </div>
  </section>
);

export default CollectionHero;
