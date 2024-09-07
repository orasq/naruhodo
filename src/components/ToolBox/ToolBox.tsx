"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconCircleCheck,
  IconCircleCheckFilled,
  IconSettings,
  IconTextSize,
  IconX,
} from "@tabler/icons-react";
import useToggle from "@/hooks/useToggle";
import { toolboxButtonStyle, toolboxListStyle } from "./ToolBox.styles";
import { FINISHED_BOOK_KEY, ICON_SIZE } from "@/lib/utils/constants";

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
  const [isBookFinished, setIsBookFinished] = useState(false); // TODO: use useToggle when understood why it's not working in strict mode

  const { slug } = useParams();

  useEffect(() => {
    const savedFinishedBook = localStorage.getItem(FINISHED_BOOK_KEY(slug));

    if (savedFinishedBook === "true") setIsBookFinished(true);
  }, []);

  function handleBookFinishedClick() {
    const storageKey = FINISHED_BOOK_KEY(slug);

    isBookFinished
      ? localStorage.removeItem(storageKey)
      : localStorage.setItem(storageKey, "true");

    setIsBookFinished(!isBookFinished);
  }

  return (
    <div className="pointer-events-auto absolute bottom-8 right-4 flex flex-col items-center justify-center rounded-xl bg-surface-light p-1 shadow-sm">
      <div
        id="toolList"
        className={toolboxListStyle({
          state: isToolboxOpen ? "visible" : "hidden",
        })}
      >
        <ul className="flex flex-col gap-1 overflow-hidden">
          {/* Bookmark */}
          <li>
            <button
              className={toolboxButtonStyle()}
              onClick={toggleBookmarkMode}
            >
              {isBookmarkModeActive ? (
                <IconBookmarkFilled size={ICON_SIZE} />
              ) : (
                <IconBookmark size={ICON_SIZE} />
              )}
            </button>
          </li>

          {/* Finished reading */}
          <li>
            <button
              className={toolboxButtonStyle()}
              onClick={handleBookFinishedClick}
            >
              {isBookFinished ? (
                <IconCircleCheckFilled size={ICON_SIZE} />
              ) : (
                <IconCircleCheck size={ICON_SIZE} />
              )}
            </button>
          </li>

          {/* Toggle font size */}
          <li>
            <button className={toolboxButtonStyle()} onClick={toggleFontSize}>
              <IconTextSize size={ICON_SIZE} />
            </button>
          </li>
        </ul>
      </div>

      {/* Open / close button   */}
      <button
        className={toolboxButtonStyle()}
        onClick={toggleToolbox}
        aria-haspopup="true"
        aria-label="Toggle toolbox opening"
        aria-expanded={isToolboxOpen}
        aria-controls="toolList"
      >
        {isToolboxOpen ? (
          <IconX size={ICON_SIZE} />
        ) : (
          <IconSettings size={ICON_SIZE} />
        )}
      </button>
    </div>
  );
}

export default ToolBox;
