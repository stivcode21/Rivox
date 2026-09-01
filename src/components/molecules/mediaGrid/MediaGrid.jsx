import { Link } from "react-router-dom";
import styles from "./MediaGrid.module.css";

const MediaGrid = ({ items = [], round = false }) => (
  <ul className={styles.grid}>
    {items.map((item) => (
      <li key={item.id}>
        <Link to={item.to} className={styles.card}>
          <img
            src={item.image}
            alt={item.title}
            className={round ? styles.round : styles.cover}
          />
          <strong>{item.title}</strong>
          {item.subtitle ? <span>{item.subtitle}</span> : null}
        </Link>
      </li>
    ))}
  </ul>
);

export default MediaGrid;
