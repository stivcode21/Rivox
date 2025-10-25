import ControlsPlayer from "@/components/atoms/controlsPlayer/ControlsPlayer";
import styles from "./Player.module.css";
import poster from "@/assets/poster-mojandoAsientos.webp";
import { useCollapseSidebar } from "@/store/collapseSidebar";

const Player = () => {
  const { currentState } = useCollapseSidebar();

  return (
    <section className={`${styles.container} ${!currentState && styles.close}`}>
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
