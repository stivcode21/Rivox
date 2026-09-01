import { useCollapseSidebar } from "@/store/collapseSidebar";
import Sidebar from "@/components/organisms/sidebar/Sidebar";
import UtilityBar from "@/components/organisms/utilityBar/UtilityBar";
import styles from "./MainLayout.module.css";
import { useEffect } from "react";
import Player from "@/components/organisms/player/Player";
import CollapseButton from "@/components/atoms/collapseButton/CollapseButton";

const MainLayout = ({ children }) => {
  const { currentState, setCurrentState } = useCollapseSidebar();

  useEffect(() => {
    const handleResize = () => {
      setCurrentState(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCurrentState]);

  return (
    <div className={styles.shell}>
      <div className={styles.workspace}>
        {currentState && (
          <aside className={styles.sidebar}>
            <Sidebar />
          </aside>
        )}

        <main className={styles.main}>{children}</main>

        <aside className={styles.utility}>
          <UtilityBar />
        </aside>
      </div>

      <Player />

      {!currentState && (
        <div className={styles.open}>
          <CollapseButton />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
