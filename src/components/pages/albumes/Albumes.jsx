import { useEffect } from "react";
import MainLayout from "@/components/templates/mainLayout/MainLayout";
import PageHeader from "@/components/molecules/pageHeader/PageHeader";
import MediaGrid from "@/components/molecules/mediaGrid/MediaGrid";
import StatusMessage from "@/components/molecules/statusMessage/StatusMessage";
import { useCatalogStore } from "@/store/catalogStore";

const Albumes = () => {
  const status = useCatalogStore((state) => state.status);
  const albums = useCatalogStore((state) => state.albums);
  const loadAlbums = useCatalogStore((state) => state.loadAlbums);

  useEffect(() => {
    if (status === "ready") loadAlbums();
  }, [status, loadAlbums]);

  const items = albums.map((album) => ({
    id: album.id,
    to: `/albumes/${album.id}`,
    image: album.cover,
    title: album.title,
    subtitle: album.artist?.name || "Álbum",
  }));

  return (
    <MainLayout>
      <PageHeader
        eyebrow="Explorar"
        title="Álbumes"
        subtitle="Lo más escuchado ahora en Deezer."
      />
      {status === "loading" && <StatusMessage>Cargando catálogo…</StatusMessage>}
      {status === "error" && <StatusMessage tone="error">No se pudieron cargar los álbumes.</StatusMessage>}
      {status === "ready" && <MediaGrid items={items} />}
    </MainLayout>
  );
};

export default Albumes;
