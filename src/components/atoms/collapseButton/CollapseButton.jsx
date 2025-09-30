import { useCollapseSidebar } from "../../../store/collapseSidebar";
import styles from "./CollapseButton.module.css";

const CollapseButton = () => {
  const { setCurrentState, currentState } = useCollapseSidebar();

  return (
    <button
      className={`${styles.collapseButton} ${!currentState && styles.open}`}
      onClick={() => setCurrentState(!currentState)}
    >
      {currentState ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24s"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m13 20l-3-8l3-8"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m11 4l3 8l-3 8"
          />
        </svg>
      )}
    </button>
  );
};

export default CollapseButton;
