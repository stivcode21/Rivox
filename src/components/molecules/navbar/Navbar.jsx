import { Disc3, Heart, Home, UsersRound } from "lucide-react";
import styles from "./Navbar.module.css";
import { useStateSection } from "@/store/stateSection";

const Navbar = () => {
  const { currentSection, setCurrentSection } = useStateSection();

  const ITEMS = [
    { name: "Home", icon: <Home /> },
    { name: "Favoritos", icon: <Heart /> },
    { name: "Albumes", icon: <Disc3 /> },
    { name: "Artista", icon: <UsersRound /> },
  ];

  return (
    <nav>
      <ul className={styles.list}>
        {ITEMS.map((item) => (
          <li
            className={`${styles.item} ${
              currentSection === item.name ? styles.active : ""
            }`}
            key={item.name}
            onClick={() => setCurrentSection(item.name)}
          >
            <span>{item.icon}</span>
            {item.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
