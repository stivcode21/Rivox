import { useEffect } from "react";
import AppRouter from "./routing/AppRouter";
import { useThemeStore } from "./store/ThemeStore";
import { useCatalogStore } from "./store/catalogStore";
import { usePlayerStore } from "./store/playerStore";
import "./index.css";

const App = () => {
  const { isDarkMode } = useThemeStore();
  const status = useCatalogStore((state) => state.status);
  const songsByFilter = useCatalogStore((state) => state.songsByFilter);
  const loadHome = useCatalogStore((state) => state.loadHome);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  useEffect(() => {
    loadHome();
  }, [loadHome]);

  useEffect(() => {
    if (status !== "ready") return;
    const songs = Object.values(songsByFilter)[0] ?? [];
    usePlayerStore.getState().hydrate(songs);
  }, [status, songsByFilter]);

  return <AppRouter />;
};

export default App;
