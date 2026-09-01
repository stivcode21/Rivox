import { FEATURED_ARTIST_QUERY } from "@/config/deezer";
import { deezerGet } from "@/services/deezer/client";
import { mapAlbum, mapArtist, mapPlaylist, mapTrack } from "@/services/deezer/mappers";

const list = (payload) => payload?.data ?? [];

export const fetchChartTracks = async (filter) => {
  try {
    const payload = await deezerGet(`/chart/${filter.chartId}/tracks`);
    const tracks = list(payload).map((track) => mapTrack(track, filter.id));
    if (tracks.length) return tracks;
  } catch {
    // Some genre charts 404; search keeps the UI populated.
  }

  const query = encodeURIComponent(filter.name);
  const payload = await deezerGet(`/search/track?q=${query}&limit=20`);
  return list(payload).map((track) => mapTrack(track, filter.id));
};

export const fetchChartPlaylists = async () => {
  const payload = await deezerGet("/chart/0/playlists");
  return list(payload).slice(0, 6).map(mapPlaylist);
};

export const fetchChartAlbums = async () => {
  const payload = await deezerGet("/chart/0/albums");
  return list(payload).slice(0, 16).map((album) => mapAlbum(album));
};

export const fetchChartArtists = async () => {
  const payload = await deezerGet("/chart/0/artists");
  return list(payload).slice(0, 16).map(mapArtist);
};

export const fetchTrackById = async (id) => {
  const track = await deezerGet(`/track/${id}`);
  return mapTrack(track);
};

export const fetchPlaylistById = async (id) => {
  const playlist = await deezerGet(`/playlist/${id}`);
  return {
    playlist: mapPlaylist(playlist),
    tracks: list(playlist.tracks).map((track) => mapTrack(track)),
  };
};

export const fetchAlbumById = async (id) => {
  const album = await deezerGet(`/album/${id}`);
  return {
    album: mapAlbum(album),
    tracks: list(album.tracks).map((track) => mapTrack(track, null, album)),
  };
};

export const fetchArtistById = async (id) => {
  const [artist, topTracks, albums] = await Promise.all([
    deezerGet(`/artist/${id}`),
    deezerGet(`/artist/${id}/top?limit=15`),
    deezerGet(`/artist/${id}/albums?limit=8`),
  ]);
  const mappedArtist = mapArtist(artist);
  return {
    artist: mappedArtist,
    tracks: list(topTracks).map((track) => mapTrack(track)),
    albums: list(albums).map((album) => mapAlbum(album, mappedArtist)),
  };
};

export const fetchFeaturedArtist = async () => {
  const search = await deezerGet(
    `/search/artist?q=${encodeURIComponent(FEATURED_ARTIST_QUERY)}`,
  );
  const match =
    list(search).find(
      (artist) => artist.name.toLowerCase() === FEATURED_ARTIST_QUERY.toLowerCase(),
    ) ?? list(search)[0];

  if (!match) return null;

  const [artist, related, albums, topTracks] = await Promise.all([
    deezerGet(`/artist/${match.id}`),
    deezerGet(`/artist/${match.id}/related`),
    deezerGet(`/artist/${match.id}/albums?limit=3`),
    deezerGet(`/artist/${match.id}/top?limit=10`),
  ]);

  const mappedArtist = mapArtist(artist);

  return {
    artistId: mappedArtist.id,
    rank: 1,
    artist: mappedArtist,
    relatedArtists: list(related).slice(0, 4).map(mapArtist),
    popularAlbums: list(albums)
      .slice(0, 3)
      .map((album) => mapAlbum(album, mappedArtist)),
    topTracks: list(topTracks).map((track) => mapTrack(track)),
  };
};

