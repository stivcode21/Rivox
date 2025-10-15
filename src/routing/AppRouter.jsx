import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../components/pages/home/Home";
import Favorites from "../components/pages/favorites/Favorites";
import Albumes from "../components/pages/albumes/Albumes";
import Artistas from "../components/pages/artistas/Artistas";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/albumes" element={<Albumes />} />
        <Route path="/artistas" element={<Artistas />} />
      </Routes>
    </BrowserRouter>
  );
}
