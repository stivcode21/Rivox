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
        <img className={styles.img} src="./LogoRivox.svg" alt="Logo-Rivox" />
        <CollapseButton />
      </header>
      <div className={styles.containerSearch}>
        <SearchBar />
      </div>
      <section>
        <article>
          <h1 className={styles.title}>menu</h1>
          <Navbar />
        </article>
      </section>

      <section>
        <article>
          <div className={styles.playlistHeader}>
            <h1 className={styles.title}>Playlist</h1>
            <button>
              <PlusIcon className={styles.icon} />
            </button>
          </div>
          <PlayLists />
        </article>
      </section>
    </div>
  );
};

export default Sidebar;
