import ControlsPlayer from "../../atoms/controlsPlayer/ControlsPlayer";
import styles from "./Player.module.css";
import poster from "../../../assets/poster-mojandoAsientos.webp";

const Player = () => {
  return (
    <section className={styles.container}>
      <img src={poster} className={styles.poster} alt="poster de la cancion" />
      <div className={styles.player}>
        <div className={styles.controls}>
          <ControlsPlayer />
        </div>
        <div className={styles.bar}></div>
      </div>
    </section>
  );
};

export default Player;
