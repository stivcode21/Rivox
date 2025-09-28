import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src="./LogoRivox.svg" alt="Logo-Rivox" />
      <div>sidebar</div>
    </div>
  );
};

export default Sidebar;
