import MusicFilters from "@/components/molecules/musicFilters/MusicFilters";
import MainLayout from "@/components/templates/mainLayout/MainLayout";
import styles from "./Home.module.css";
import ListeSongs from "@/components/molecules/listeSongs/ListeSongs";
import { BadgeCheck } from "lucide-react";

const Home = () => {
  return (
    <MainLayout>
      <div className={styles.banner}>
        <div className={styles.img}></div>
        <div className={styles.gradient}></div>

        <span className={styles.number}>#1</span>
        <div className={styles.containerArtist}>
          <p className={styles.subtitle}>Artist</p>
          <h2 className={styles.artista}>
            Mike Towers
            <span>
              <BadgeCheck className={styles.icon} />
            </span>
          </h2>
        </div>
      </div>
      <MusicFilters />
      <ListeSongs />
    </MainLayout>
  );
};

export default Home;
