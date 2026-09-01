import { PlusIcon } from "lucide-react";
import styles from "./Sidebar.module.css";
import SearchBar from "@/components/atoms/searchBar/SearchBar";
import Navbar from "@/components/molecules/navbar/Navbar";
import PlayLists from "@/components/molecules/playLists/PlayLists";
import CollapseButton from "@/components/atoms/collapseButton/CollapseButton";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.img} src="/LogoRivox.svg" alt="Logo Rivox" />
        <CollapseButton />
      </header>

      <SearchBar />

      <section className={styles.section}>
        <h2 className={styles.title}>Menu</h2>
        <Navbar />
      </section>

      <section className={`${styles.section} ${styles.playlists}`}>
        <div className={styles.playlistHeader}>
          <h2 className={styles.title}>Playlist</h2>
          <button type="button" aria-label="Crear playlist">
            <PlusIcon className={styles.icon} />
          </button>
        </div>
        <PlayLists />
      </section>
    </div>
  );
};

export default Sidebar;
