import { useEffect } from "react";
import MainLayout from "@/components/templates/mainLayout/MainLayout";
import PageHeader from "@/components/molecules/pageHeader/PageHeader";
import ListeSongs from "@/components/molecules/listeSongs/ListeSongs";
import StatusMessage from "@/components/molecules/statusMessage/StatusMessage";
import { useLibraryStore } from "@/store/libraryStore";
import { useCatalogStore } from "@/store/catalogStore";

const Favorites = () => {
  const likedSongIds = useLibraryStore((state) => state.likedSongIds);
  const songsById = useCatalogStore((state) => state.songsById);
  const loadTracksByIds = useCatalogStore((state) => state.loadTracksByIds);
  const songs = likedSongIds.map((id) => songsById[id]).filter(Boolean);

  useEffect(() => {
    loadTracksByIds(likedSongIds);
  }, [likedSongIds, loadTracksByIds]);

  return (
    <MainLayout>
      <PageHeader
        eyebrow="Biblioteca"
        title="Favoritos"
        subtitle="Canciones que marcaste con el corazón."
      />
      {likedSongIds.length === 0 ? (
        <StatusMessage>
          Aún no hay favoritos. En cualquier lista, toca el corazón para guardar una canción.
        </StatusMessage>
      ) : (
        <ListeSongs songs={songs} showAll />
      )}
    </MainLayout>
  );
};

export default Favorites;
