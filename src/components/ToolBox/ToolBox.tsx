"use client";

import {
  IconBookmark,
  IconCircleCheck,
  IconSettings,
  IconTextSize,
  IconX,
} from "@tabler/icons-react";
import styles from "./ToolBox.module.scss";
import { useState } from "react";

function ToolBox() {
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);

  return (
    <div className={styles.toolbox}>
      <div
        className={`${styles["tool-list"]} ${
          isToolboxOpen ? styles["is-open"] : ""
        }`}
      >
        <ul>
          <li>
            <IconBookmark />
          </li>
          <li>
            <IconCircleCheck />
          </li>
          <li>
            <IconTextSize />
          </li>
        </ul>
      </div>

      {/* Open / close button   */}
      <button
        className={styles["toolbox-button"]}
        onClick={() => setIsToolboxOpen(!isToolboxOpen)}
      >
        {isToolboxOpen ? <IconX /> : <IconSettings />}
      </button>
    </div>
  );
}

export default ToolBox;
