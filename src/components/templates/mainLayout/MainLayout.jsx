import { useCollapseSidebar } from "@/store/collapseSidebar";
import CollapseButton from "@/components/atoms/collapseButton/CollapseButton";
import Sidebar from "@/components/organisms/sidebar/Sidebar";
import UtilityBar from "@/components/organisms/utilityBar/UtilityBar";
import styles from "./MainLayout.module.css";
import { useEffect } from "react";
import Player from "@/components/organisms/player/Player";

const MainLayout = ({ children }) => {
  const { currentState, setCurrentState } = useCollapseSidebar();

  //ocultar sidebar en pantallas pequeñas
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCurrentState(false);
      } else {
        setCurrentState(true);
      }
    };

    handleResize();

    // Ejecutar al inicio
    window.addEventListener("resize", handleResize);

    // Limpiar el event listener al desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, [setCurrentState]);

  return (
    <div className={styles.background}>
      <div className={styles.effect}>
        <section className={styles.container}>
          <article className={styles.sidebar}>
            {currentState && <Sidebar />}
          </article>
          <article className={`${styles.content}`}>
            <div className={styles.children}>{children}</div>
            {!currentState && <CollapseButton />}
            <Player />
          </article>
          <UtilityBar />
        </section>
      </div>
    </div>
  );
};

export default MainLayout;
