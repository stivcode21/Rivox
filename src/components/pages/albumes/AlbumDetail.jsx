import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/templates/mainLayout/MainLayout";
import CollectionHero from "@/components/molecules/collectionHero/CollectionHero";
import ListeSongs from "@/components/molecules/listeSongs/ListeSongs";
import StatusMessage from "@/components/molecules/statusMessage/StatusMessage";
import { useCatalogStore } from "@/store/catalogStore";
import { usePlayerStore } from "@/store/playerStore";

const AlbumDetail = () => {
  const { id } = useParams();
  const collection = useCatalogStore((state) => state.collection);
  const collectionStatus = useCatalogStore((state) => state.collectionStatus);
  const collectionError = useCatalogStore((state) => state.collectionError);
  const loadAlbum = useCatalogStore((state) => state.loadAlbum);
  const playSong = usePlayerStore((state) => state.playSong);

  useEffect(() => {
    if (id) loadAlbum(id);
  }, [id, loadAlbum]);

  const album = collection?.type === "album" ? collection.entity : null;
  const tracks = collection?.type === "album" ? collection.tracks : [];

  return (
    <MainLayout>
      {collectionStatus === "loading" && <StatusMessage>Cargando álbum…</StatusMessage>}
      {collectionStatus === "error" && (
        <StatusMessage tone="error">{collectionError}</StatusMessage>
      )}
      {collectionStatus === "ready" && album && (
        <>
          <CollectionHero
            type="Álbum"
            image={album.cover}
            title={album.title}
            subtitle={album.artist?.name}
            meta={[album.year, album.trackCount ? `${album.trackCount} tracks` : null]
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

export default AlbumDetail;
