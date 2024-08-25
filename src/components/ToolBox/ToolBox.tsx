"use client";

import {
  IconBookmark,
  IconBookmarkFilled,
  IconCircleCheck,
  IconSettings,
  IconTextSize,
  IconX,
} from "@tabler/icons-react";
import useToggle from "@/hooks/useToggle";
import { tv } from "tailwind-variants";

type ToolBoxProps = {
  toggleFontSize: () => void;
  toggleBookmarkMode: () => void;
  isBookmarkModeActive: boolean;
};

const toolboxButtonStyle = tv({
  base: [
    "flex h-toolbox w-toolbox shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent opacity-50 duration-300 motion-safe:transition-opacity",
    "hover:opacity-100",
  ],
  variants: {
    state: {
      visible: "opacity-100",
      hidden: "opacity-0",
    },
  },
});

const toolboxListStyle = tv({
  base: [
    "relative grid duration-1000 ease-smooth motion-safe:transition-[opacity,grid]",
    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-copy/20 after:opacity-0 after:delay-300 after:duration-1000 after:motion-safe:transition-opacity",
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

  return (
    <div className="pointer-events-auto absolute bottom-8 right-4 flex flex-col items-center justify-center rounded-[calc(var(--toolbox-width)/2)] border-1 border-copy/20 bg-background">
      <div
        id="toolList"
        className={toolboxListStyle({
          state: isToolboxOpen ? "visible" : "hidden",
        })}
      >
        <ul className="overflow-hidden">
          <li>
            <button
              className={toolboxButtonStyle({
                state: isToolboxOpen ? "visible" : "hidden",
              })}
              onClick={toggleBookmarkMode}
            >
              {isBookmarkModeActive ? <IconBookmarkFilled /> : <IconBookmark />}
            </button>
          </li>
          <li>
            <button
              className={toolboxButtonStyle({
                state: isToolboxOpen ? "visible" : "hidden",
              })}
            >
              <IconCircleCheck />
            </button>
          </li>
          <li>
            <button
              className={toolboxButtonStyle({
                state: isToolboxOpen ? "visible" : "hidden",
              })}
            >
              <IconTextSize onClick={toggleFontSize} />
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
        {isToolboxOpen ? <IconX /> : <IconSettings />}
      </button>
    </div>
  );
}

export default ToolBox;
