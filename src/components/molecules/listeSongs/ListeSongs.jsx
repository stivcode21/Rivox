import { Ellipsis, Heart } from "lucide-react";
import styles from "./ListeSongs.module.css";
import { allSongs } from "../../../data/songs";

const ListeSongs = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        {allSongs.map((song) => (
          <li className={styles.item} key={song.id}>
            <div className={styles.description}>
              <span className={styles.number}>{song.id + 1}</span>
              <img src={song.img} alt="poster-song" className={styles.img} />
              <p className={styles.name}>{song.title}</p>
            </div>
            <p className={styles.artist}>{song.artist}</p>
            <div className={styles.icons}>
              <button>
                <Heart className={styles.icon} />
              </button>
              <button>
                <Ellipsis className={styles.icon} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ListeSongs;
