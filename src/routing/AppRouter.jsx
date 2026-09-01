import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/pages/home/Home";
import Favorites from "../components/pages/favorites/Favorites";
import Albumes from "../components/pages/albumes/Albumes";
import AlbumDetail from "../components/pages/albumes/AlbumDetail";
import Artistas from "../components/pages/artistas/Artistas";
import ArtistDetail from "../components/pages/artistas/ArtistDetail";
import Playlist from "../components/pages/playlist/Playlist";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/albumes" element={<Albumes />} />
        <Route path="/albumes/:id" element={<AlbumDetail />} />
        <Route path="/artistas" element={<Artistas />} />
        <Route path="/artistas/:id" element={<ArtistDetail />} />
        <Route path="/playlist/:id" element={<Playlist />} />
      </Routes>
    </BrowserRouter>
  );
}
