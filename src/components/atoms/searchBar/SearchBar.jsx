import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.containerInput}>
      <label htmlFor="buscar" className={styles.icon}>
        <Search className={styles.icon} />
      </label>
      <input
        type="text"
        id="buscar"
        placeholder="Buscar"
        name="buscar"
        className={styles.buscar}
      />
    </div>
  );
};

export default SearchBar;
