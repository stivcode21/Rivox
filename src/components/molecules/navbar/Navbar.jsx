import styles from "./Navbar.module.css";
import { useStateSection } from "@/store/stateSection";
import { useLocation, useNavigate } from "react-router-dom";
import { getNavSections } from "@/services/catalog";

const Navbar = () => {
  const { setCurrentSection } = useStateSection();
  const navigate = useNavigate();
  const location = useLocation();
  const sections = getNavSections();

  const handleSection = (section) => {
    setCurrentSection(section.name);
    navigate(`/${section.path}`);
  };

  return (
    <nav>
      <ul className={styles.list}>
        {sections.map((item) => {
          const path = `/${item.path}`;
          const isActive =
            item.path === ""
              ? location.pathname === "/"
              : location.pathname === path ||
                location.pathname.startsWith(`${path}/`);

          return (
            <li
              className={`${styles.item} ${isActive ? styles.active : ""}`}
              key={item.name}
              onClick={() => handleSection(item)}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.name}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
