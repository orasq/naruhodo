"use client";

import {
  IconBookmark,
  IconCircleCheck,
  IconSettings,
  IconTextSize,
  IconX,
} from "@tabler/icons-react";
import styles from "./ToolBox.module.scss";
import useToggle from "@/hooks/useToggle";

type ToolBoxProps = {
  toggleFontSize: () => void;
};

function ToolBox({ toggleFontSize }: ToolBoxProps) {
  const [isToolboxOpen, toggleToolbox] = useToggle(false);

  return (
    <div className={styles.toolbox}>
      <div
        className={`${styles["tool-list"]} ${
          isToolboxOpen ? styles["is-open"] : ""
        }`}
      >
        <ul>
          <li>
            <button className={styles["tool-list-button"]}>
              <IconBookmark />
            </button>
          </li>
          <li>
            <button className={styles["tool-list-button"]}>
              <IconCircleCheck />
            </button>
          </li>
          <li>
            <button className={styles["tool-list-button"]}>
              <IconTextSize onClick={toggleFontSize} />
            </button>
          </li>
        </ul>
      </div>

      {/* Open / close button   */}
      <button className={styles["toolbox-button"]} onClick={toggleToolbox}>
        {isToolboxOpen ? <IconX /> : <IconSettings />}
      </button>
    </div>
  );
}

export default ToolBox;
