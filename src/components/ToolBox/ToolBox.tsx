"use client";

import {
  IconBookmark,
  IconBookmarkFilled,
  IconCircleCheck,
  IconSettings,
  IconTextSize,
  IconX,
} from "@tabler/icons-react";
import styles from "./ToolBox.module.scss";
import useToggle from "@/hooks/useToggle";

type ToolBoxProps = {
  toggleFontSize: () => void;
  toggleBookmarkMode: () => void;
  isBookmarkModeActive: boolean;
};

function ToolBox({
  toggleFontSize,
  toggleBookmarkMode,
  isBookmarkModeActive,
}: ToolBoxProps) {
  const [isToolboxOpen, toggleToolbox] = useToggle(false);

  return (
    <div className={styles.toolbox}>
      <div
        id="toolList"
        className={`${styles["tool-list"]} ${
          isToolboxOpen ? styles["is-open"] : ""
        }`}
      >
        <ul>
          <li>
            <button
              className={styles["tool-list-button"]}
              onClick={toggleBookmarkMode}
            >
              {isBookmarkModeActive ? <IconBookmarkFilled /> : <IconBookmark />}
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
      <button
        className={styles["toolbox-button"]}
        onClick={toggleToolbox}
        aria-haspopup="true"
        aria-label="Toggle toolbox opening"
        aria-expanded={isToolboxOpen}
        aria-controls="toolList"
      >
        {isToolboxOpen ? <IconX /> : <IconSettings />}
      </button>
    </div>
  );
}

export default ToolBox;
