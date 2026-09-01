import styles from "./PageHeader.module.css";

const PageHeader = ({ eyebrow, title, subtitle }) => (
  <header className={styles.header}>
    {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
    <h1>{title}</h1>
    {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
  </header>
);

export default PageHeader;
