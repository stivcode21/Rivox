import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/templates/mainLayout/MainLayout";
import CollectionHero from "@/components/molecules/collectionHero/CollectionHero";
import ListeSongs from "@/components/molecules/listeSongs/ListeSongs";
import MediaGrid from "@/components/molecules/mediaGrid/MediaGrid";
import PageHeader from "@/components/molecules/pageHeader/PageHeader";
import StatusMessage from "@/components/molecules/statusMessage/StatusMessage";
import { useCatalogStore } from "@/store/catalogStore";
import { usePlayerStore } from "@/store/playerStore";
import { formatListeners } from "@/utils/formatters";

const ArtistDetail = () => {
  const { id } = useParams();
  const collection = useCatalogStore((state) => state.collection);
  const collectionStatus = useCatalogStore((state) => state.collectionStatus);
  const collectionError = useCatalogStore((state) => state.collectionError);
  const loadArtist = useCatalogStore((state) => state.loadArtist);
  const playSong = usePlayerStore((state) => state.playSong);

  useEffect(() => {
    if (id) loadArtist(id);
  }, [id, loadArtist]);

  const artist = collection?.type === "artist" ? collection.entity : null;
  const tracks = collection?.type === "artist" ? collection.tracks : [];
  const albums = collection?.type === "artist" ? collection.albums : [];

  return (
    <MainLayout>
      {collectionStatus === "loading" && <StatusMessage>Cargando artista…</StatusMessage>}
      {collectionStatus === "error" && (
        <StatusMessage tone="error">{collectionError}</StatusMessage>
      )}
      {collectionStatus === "ready" && artist && (
        <>
          <CollectionHero
            type="Artista"
            image={artist.image}
            title={artist.name}
            subtitle={artist.bio}
            meta={`${formatListeners(artist.monthlyListeners)} fans`}
            round
            onPlay={
              tracks[0] ? () => playSong(tracks[0].id, tracks) : undefined
            }
          />
          <ListeSongs songs={tracks} showAll />
          {albums.length > 0 && (
            <>
              <PageHeader title="Álbumes" />
              <MediaGrid
                items={albums.map((album) => ({
                  id: album.id,
                  to: `/albumes/${album.id}`,
                  image: album.cover,
                  title: album.title,
                  subtitle: album.year ? String(album.year) : artist.name,
                }))}
              />
            </>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default ArtistDetail;
