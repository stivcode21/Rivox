import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/templates/mainLayout/MainLayout";
import CollectionHero from "@/components/molecules/collectionHero/CollectionHero";
import ListeSongs from "@/components/molecules/listeSongs/ListeSongs";
import StatusMessage from "@/components/molecules/statusMessage/StatusMessage";
import { useCatalogStore } from "@/store/catalogStore";
import { usePlayerStore } from "@/store/playerStore";
import { formatListeners } from "@/utils/formatters";

const Playlist = () => {
  const { id } = useParams();
  const collection = useCatalogStore((state) => state.collection);
  const collectionStatus = useCatalogStore((state) => state.collectionStatus);
  const collectionError = useCatalogStore((state) => state.collectionError);
  const loadPlaylist = useCatalogStore((state) => state.loadPlaylist);
  const playSong = usePlayerStore((state) => state.playSong);

  useEffect(() => {
    if (id) loadPlaylist(id);
  }, [id, loadPlaylist]);

  const playlist = collection?.type === "playlist" ? collection.entity : null;
  const tracks = collection?.type === "playlist" ? collection.tracks : [];

  return (
    <MainLayout>
      {collectionStatus === "loading" && <StatusMessage>Cargando playlist…</StatusMessage>}
      {collectionStatus === "error" && (
        <StatusMessage tone="error">{collectionError}</StatusMessage>
      )}
      {collectionStatus === "ready" && playlist && (
        <>
          <CollectionHero
            type="Playlist"
            image={playlist.pictureXl || playlist.picture}
            title={playlist.name}
            subtitle={playlist.description}
            meta={[
              playlist.creator,
              playlist.trackCount ? `${playlist.trackCount} tracks` : null,
              playlist.fans ? `${formatListeners(playlist.fans)} fans` : null,
            ]
              .filter(Boolean)
              .join(" · ")}
            onPlay={
              tracks[0] ? () => playSong(tracks[0].id, tracks) : undefined
            }
          />
          <ListeSongs songs={tracks} showAll />
        </>
      )}
    </MainLayout>
  );
};

export default Playlist;
