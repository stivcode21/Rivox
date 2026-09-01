import styles from "./StatusMessage.module.css";

const StatusMessage = ({ tone = "muted", children }) => (
  <p className={tone === "error" ? styles.error : styles.status}>{children}</p>
);

export default StatusMessage;
