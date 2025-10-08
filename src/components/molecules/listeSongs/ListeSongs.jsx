import { Ellipsis, Heart } from "lucide-react";
import styles from "./ListeSongs.module.css";
import img from "@/assets/mike.webp";

const ListeSongs = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>
          {
            <>
              <div className={styles.description}>
                <span>01</span>
                <img src={img} alt="poster-song" className={styles.img} />
                <p>Mike</p>
              </div>
              <p>dasdsa</p>
              <div>
                <Heart className={styles.icon} />
                <Ellipsis className={styles.icon} />
              </div>
            </>
          }
        </li>
      </ul>
    </nav>
  );
};

export default ListeSongs;
