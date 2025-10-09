import { Bell, CircleQuestionMark, Crown, Settings } from "lucide-react";
import styles from "./UtilityBar.module.css";
import logo from "../../../assets/mclovin.jpg";
import { useCollapseSidebar } from "../../../store/collapseSidebar";
import CollapseButton from "../../atoms/collapseButton/CollapseButton";

const UtilityBar = () => {
  const { currentState } = useCollapseSidebar();

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        {!currentState && (
          <div className={styles.btnCollapse}>
            <CollapseButton />
          </div>
        )}
        <div className={styles.pro}>
          <Crown className={styles.icon} />
          <h2 className={styles.title}>
            <span>Go</span>
            PRO
          </h2>
        </div>
      </div>
      <nav>
        <ul className={styles.list}>
          <button>
            <li className={styles.item}>
              <CircleQuestionMark />
            </li>
          </button>
          <button>
            <li className={styles.item}>
              <Bell />
            </li>
          </button>
          <button>
            <li className={styles.item}>
              <Settings />
            </li>
          </button>
          <button>
            <li className={styles.item}>
              <img src={logo} className={styles.img} alt="imagen-de-perfil" />
            </li>
          </button>
        </ul>
      </nav>
    </section>
  );
};

export default UtilityBar;
