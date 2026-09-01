import { useEffect, useState } from "react";
import MusicFilters from "@/components/molecules/musicFilters/MusicFilters";
import MainLayout from "@/components/templates/mainLayout/MainLayout";
import ListeSongs from "@/components/molecules/listeSongs/ListeSongs";
import ArtistHero from "@/components/molecules/artistHero/ArtistHero";
import { getFilters } from "@/services/catalog";
import { useCatalogStore } from "@/store/catalogStore";
import styles from "./Home.module.css";

const Home = () => {
  const filters = getFilters();
  const [filterId, setFilterId] = useState(filters[0]?.id);
  const status = useCatalogStore((state) => state.status);
  const error = useCatalogStore((state) => state.error);
  const spotlight = useCatalogStore((state) => state.spotlight);
  const songsByFilter = useCatalogStore((state) => state.songsByFilter);
  const loadFilter = useCatalogStore((state) => state.loadFilter);
  const songs = songsByFilter[filterId] ?? [];

  useEffect(() => {
    if (status !== "ready" || !filterId) return;
    loadFilter(filterId);
  }, [filterId, loadFilter, status]);

  return (
    <MainLayout>
      <ArtistHero artist={spotlight?.artist} rank={spotlight?.rank} />
      <MusicFilters
        filters={filters}
        activeId={filterId}
        onChange={setFilterId}
      />
      {status === "loading" && (
        <p className={styles.status}>Cargando catálogo de Deezer…</p>
      )}
      {status === "error" && <p className={styles.error}>{error}</p>}
      {status === "ready" && <ListeSongs songs={songs} />}
    </MainLayout>
  );
};

export default Home;
