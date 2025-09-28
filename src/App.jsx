import { useEffect } from "react";
import AppRouter from "./routing/AppRouter";
import { useThemeStore } from "./store/ThemeStore";
import "./index.css";

const App = () => {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);
  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
