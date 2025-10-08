import styles from "./MusicFilters.module.css";

const MusicFilters = () => {
  const FILTERS = [
    { id: "1", name: "Top Global" },
    { id: "2", name: "Tencencias" },
    { id: "3", name: "Raggaetong" },
    { id: "5", name: "Trap" },
  ];
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        {FILTERS.map((section) => (
          <li key={section.id} className={styles.item}>
            {section.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MusicFilters;
