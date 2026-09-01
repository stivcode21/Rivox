import { Bell, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./UtilityBar.module.css";
import { useCollapseSidebar } from "@/store/collapseSidebar";
import CollapseButton from "@/components/atoms/collapseButton/CollapseButton";
import { getCurrentUser } from "@/services/catalog";
import { useCatalogStore } from "@/store/catalogStore";
import { formatListeners } from "@/utils/formatters";

const UtilityBar = () => {
  const { currentState } = useCollapseSidebar();
  const user = getCurrentUser();
  const spotlight = useCatalogStore((state) => state.spotlight);
  const artist = spotlight?.artist;
  const relatedArtists = spotlight?.relatedArtists ?? [];
  const popularAlbums = spotlight?.popularAlbums ?? [];

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        {!currentState && (
          <div className={styles.btnCollapse}>
            <CollapseButton />
          </div>
        )}

        <div className={styles.headerActions}>
          <button type="button" className={styles.iconButton} aria-label="Notificaciones">
            <Bell />
          </button>
          <img src={user.avatar} className={styles.avatar} alt={user.name} />
        </div>
      </header>

      {artist && (
        <div className={styles.panels}>
          <article className={styles.card}>
            <h3>Sobre el artista</h3>
            <p>{artist.bio}</p>
            <span className={styles.listeners}>
              {formatListeners(artist.monthlyListeners)} fans en Deezer
            </span>
            <Link to={`/artistas/${artist.id}`} className={styles.link}>
              Ver perfil completo
              <ChevronRight />
            </Link>
          </article>

          <article className={styles.card}>
            <h3>Artistas relacionados</h3>
            <ul className={styles.related}>
              {relatedArtists.map((related) => (
                <li key={related.id}>
                  <Link to={`/artistas/${related.id}`} className={styles.relatedItem}>
                    <img src={related.image} alt={related.name} />
                    <span>{related.name}</span>
                    <ChevronRight />
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          {popularAlbums.length > 0 && (
            <article className={styles.card}>
              <h3>Álbumes populares</h3>
              <ul className={styles.albums}>
                {popularAlbums.map((album) => (
                  <li key={album.id}>
                    <Link to={`/albumes/${album.id}`} className={styles.album}>
                      <img src={album.cover} alt={album.title} />
                      <div>
                        <strong>{album.title}</strong>
                        <p>
                          {album.artist?.name}
                          {album.year ? ` · ${album.year}` : ""}
                          {album.trackCount ? ` · ${album.trackCount} tracks` : ""}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          )}
        </div>
      )}
    </section>
  );
};

export default UtilityBar;
