"use client";

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
import { tv } from "tailwind-variants";
import { useEffect, useState } from "react";
import { FINISHED_BOOK_KEY, ICON_SIZE } from "@/lib/utils/constants";
import { useParams } from "next/navigation";

type ToolBoxProps = {
  toggleFontSize: () => void;
  toggleBookmarkMode: () => void;
  isBookmarkModeActive: boolean;
};

const toolboxButtonStyle = tv({
  base: [
    "flex h-toolbox w-toolbox shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent",
    "hover:bg-orange-0",
  ],
});

const toolboxListStyle = tv({
  base: [
    "relative grid duration-1000 ease-smooth motion-safe:transition-[opacity,grid]",
    "after:delay-20 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-background after:opacity-0 after:duration-1000 after:motion-safe:transition-opacity",
  ],
  variants: {
    state: {
      visible: "grid-rows-[1fr] opacity-100 after:opacity-100",
      hidden: "grid-rows-[0fr] opacity-0 after:opacity-0",
    },
  },
});

function ToolBox({
  toggleFontSize,
  toggleBookmarkMode,
  isBookmarkModeActive,
}: ToolBoxProps) {
  const [isToolboxOpen, toggleToolbox] = useToggle(false);
  const [isBookFinished, setIsBookFinished] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    console.log({ isBookFinishedToggle: isBookFinished });
  }, [isBookFinished]);

  useEffect(() => {
    const savedFinishedBook = localStorage.getItem(FINISHED_BOOK_KEY(slug));

    if (savedFinishedBook === "true") setIsBookFinished(true);

    console.log({
      isBookFinished,
      savedFinishedBook,
      slug: FINISHED_BOOK_KEY(slug),
    });
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
