import { Ellipsis, Heart } from "lucide-react";
import styles from "./ListeSongs.module.css";
import img from "@/assets/mike.webp";
import { allSongs } from "../../../data/songs";

const ListeSongs = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        {allSongs.map((song) => (
          <li className={styles.item}>
            <div className={styles.description}>
              <span>{song.id + 1}</span>
              <img src={song.img} alt="poster-song" className={styles.img} />
              <p>{song.title}</p>
            </div>
            <p>{song.artist}</p>
            <div>
              <Heart className={styles.icon} />
              <Ellipsis className={styles.icon} />
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ListeSongs;
