import styles from "./Navbar.module.css";
import { useStateSection } from "@/store/stateSection";
import { useNavigate } from "react-router-dom";
import { Sections } from "@/data/sections";

const Navbar = () => {
  const { currentSection, setCurrentSection } = useStateSection();
  const navigate = useNavigate();

  const handleSection = (section) => {
    setCurrentSection(section.name);
    navigate(`/${section.path}`);
  };

  return (
    <nav>
      <ul className={styles.list}>
        {Sections.map((item) => (
          <li
            className={`${styles.item} ${
              currentSection === item.name ? styles.active : ""
            }`}
            key={item.name}
            onClick={() => handleSection(item)}
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
