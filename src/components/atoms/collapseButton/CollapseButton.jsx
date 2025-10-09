import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useCollapseSidebar } from "../../../store/collapseSidebar";
import styles from "./CollapseButton.module.css";

const CollapseButton = () => {
  const { setCurrentState, currentState } = useCollapseSidebar();

  return (
    <button
      className={`${styles.collapseButton} `}
      onClick={() => setCurrentState(!currentState)}
    >
      {currentState ? <PanelRightOpen /> : <PanelRightClose />}
    </button>
  );
};

export default CollapseButton;
