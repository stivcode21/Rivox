import styles from "./MusicFilters.module.css";

const MusicFilters = ({ filters = [], activeId, onChange }) => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        {filters.map((section) => (
          <li
            key={section.id}
            className={`${styles.item} ${activeId === section.id ? styles.active : ""}`}
            onClick={() => onChange?.(section.id)}
          >
            {section.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MusicFilters;
