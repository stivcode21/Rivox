import { Bell, CircleQuestionMark, Crown, Settings } from "lucide-react";
import styles from "./UtilityBar.module.css";
import logo from "../../../assets/mclovin.jpg";

const UtilityBar = () => {
  return (
    <section className={styles.container}>
      <article className={styles.pro}>
        <Crown className={styles.icon} />
        <h2 className={styles.title}>
          <span>Go</span>
          PRO
        </h2>
      </article>
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
