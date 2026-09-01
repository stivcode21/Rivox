export const mapTrack = (track, filterId, album) => ({
  id: track.id,
  title: track.title,
  artist: track.artist?.name ?? album?.artist?.name ?? "Artista",
  artistIds: track.artist?.id != null ? [track.artist.id] : [],
  albumId: track.album?.id ?? album?.id ?? null,
  filterIds: filterId ? [filterId] : [],
  duration: track.duration ?? 0,
  explicit: Boolean(track.explicit_lyrics),
  liked: false,
  img:
    track.album?.cover_medium ||
    track.album?.cover_small ||
    album?.cover_medium ||
    album?.cover ||
    "",
  banner: track.album?.cover_xl || album?.cover_xl || track.album?.cover_big || "",
  src: track.preview || "",
});

export const mapArtist = (artist) => ({
  id: artist.id,
  name: artist.name,
  verified: (artist.nb_fan ?? 0) > 50_000,
  monthlyListeners: artist.nb_fan ?? 0,
  image: artist.picture_xl || artist.picture_big || artist.picture_medium || "",
  bio: artist.nb_album
    ? `${artist.name} en Deezer · ${artist.nb_album} álbumes en catálogo.`
    : `${artist.name} en Deezer.`,
  relatedArtistIds: [],
});

export const mapAlbum = (album, artist) => ({
  id: album.id,
  title: album.title,
  artistId: artist?.id ?? album.artist?.id,
  cover: album.cover_medium || album.cover || "",
  year: album.release_date ? Number(String(album.release_date).slice(0, 4)) : null,
  trackCount: album.nb_tracks ?? 0,
  artist: artist
    ? { id: artist.id, name: artist.name }
    : album.artist
      ? { id: album.artist.id, name: album.artist.name }
      : null,
});

export const mapPlaylist = (playlist) => ({
  id: playlist.id,
  name: playlist.title,
  picture: playlist.picture_medium || playlist.picture_small || "",
  pictureXl: playlist.picture_xl || playlist.picture_big || playlist.picture_medium || "",
  description: playlist.description || "",
  trackCount: playlist.nb_tracks ?? 0,
  fans: playlist.fans ?? 0,
  creator: playlist.creator?.name ?? "",
  songIds: [],
});
