import { useEffect } from "react";
import MainLayout from "@/components/templates/mainLayout/MainLayout";
import PageHeader from "@/components/molecules/pageHeader/PageHeader";
import MediaGrid from "@/components/molecules/mediaGrid/MediaGrid";
import StatusMessage from "@/components/molecules/statusMessage/StatusMessage";
import { useCatalogStore } from "@/store/catalogStore";

const Artistas = () => {
  const status = useCatalogStore((state) => state.status);
  const artists = useCatalogStore((state) => state.artists);
  const loadArtists = useCatalogStore((state) => state.loadArtists);

  useEffect(() => {
    if (status === "ready") loadArtists();
  }, [status, loadArtists]);

  const items = artists.map((artist) => ({
    id: artist.id,
    to: `/artistas/${artist.id}`,
    image: artist.image,
    title: artist.name,
    subtitle: "Artista",
  }));

  return (
    <MainLayout>
      <PageHeader
        eyebrow="Explorar"
        title="Artistas"
        subtitle="Artistas en tendencia según Deezer."
      />
      {status === "loading" && <StatusMessage>Cargando catálogo…</StatusMessage>}
      {status === "error" && <StatusMessage tone="error">No se pudieron cargar los artistas.</StatusMessage>}
      {status === "ready" && <MediaGrid items={items} round />}
    </MainLayout>
  );
};

export default Artistas;
