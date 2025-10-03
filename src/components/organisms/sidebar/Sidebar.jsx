import { Ellipsis, Plus, PlusIcon } from "lucide-react";
import styles from "./Sidebar.module.css";
import SearchBar from "../../atoms/searchBar/SearchBar";
import Navbar from "../../molecules/navbar/Navbar";
import PlayLists from "../../molecules/playLists/PlayLists";
import CollapseButton from "../../atoms/collapseButton/CollapseButton";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.img} src="./LogoRivox.svg" alt="Logo-Rivox" />
        <button>
          <Ellipsis className={styles.icon} />
        </button>
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
      <CollapseButton />
    </div>
  );
};

export default Sidebar;
