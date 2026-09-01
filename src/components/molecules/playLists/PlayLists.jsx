import { NavLink } from "react-router-dom";
import styles from "./PlayLists.module.css";
import { useCatalogStore } from "@/store/catalogStore";

const PlayLists = () => {
  const playlists = useCatalogStore((state) => state.playlists);

  return (
    <ul className={styles.list}>
      {playlists.map((playlist) => (
        <li key={playlist.id}>
          <NavLink
            to={`/playlist/${playlist.id}`}
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.active : ""}`
            }
          >
            {playlist.picture ? (
              <img src={playlist.picture} alt="" className={styles.swatch} />
            ) : (
              <span className={styles.swatch} />
            )}
            <span>{playlist.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default PlayLists;
