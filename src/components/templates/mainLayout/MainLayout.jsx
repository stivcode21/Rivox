import { useCollapseSidebar } from "../../../store/collapseSidebar";
import CollapseButton from "../../atoms/collapseButton/CollapseButton";
import Sidebar from "../../organisms/sidebar/Sidebar";
import UtilityBar from "../../organisms/utilityBar/UtilityBar";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children }) => {
  const { currentState } = useCollapseSidebar();

  return (
    <div className={styles.background}>
      <div className={styles.effect}>
        <section className={styles.container}>
          {currentState && <Sidebar />}
          <div className={styles.content}>
            {children}
            {!currentState && <CollapseButton />}
          </div>
          <UtilityBar />
        </section>
      </div>
    </div>
  );
};

export default MainLayout;
