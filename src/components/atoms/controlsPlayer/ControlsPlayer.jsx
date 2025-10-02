import {
  Heart,
  Info,
  Pause,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";

import styles from "./ControlsPlayer.module.css";

const ControlsPlayer = () => {
  return (
    <article className={styles.container}>
      <div className={styles.groupButtons}>
        <button className={styles.button}>
          <Heart className={styles.icon} />
        </button>
        <button className={styles.button}>
          <Info className={styles.icon} />
        </button>
      </div>

      <div className={styles.groupButtons}>
        <button className={styles.button}>
          <SkipBack className={styles.icon} />
        </button>
        <button className={styles.buttonPause}>
          <Pause className={styles.pauseIcon} />
        </button>
        <button className={styles.button}>
          <SkipForward className={styles.icon} />
        </button>
      </div>

      <div className={styles.groupButtons}>
        <button className={styles.button}>
          <Shuffle className={styles.icon} />
        </button>
        <button className={styles.button}>
          <Repeat className={styles.icon} />
        </button>
      </div>
    </article>
  );
};

export default ControlsPlayer;
