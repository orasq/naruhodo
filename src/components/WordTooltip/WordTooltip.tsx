import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { Tag } from "../Tag";
import {
  tooltipBackgroundStyle,
  tooltipContentWrapperStyle,
  tooltipPanelStyle,
} from "./WordTooltip.styles";
import {
  defineTooltipPosition,
  formatDictionaryEntry,
} from "./WordTooltip.helpers";
import type { Dispatcher } from "@/lib/types/generics.types";
import type { ParsedWordDictionaryEntry } from "@/lib/types/dictionary.types";
import type { TooltipPosition } from "./WordTooltip.types";

type WordTooltipProps = {
  linkedTo: RefObject<HTMLSpanElement>;
  setShowTooltip: Dispatcher<boolean>;
  setTooltipIsClosing: Dispatcher<boolean>;
  tooltipIsClosing: boolean;
  dictionaryEntry?: ParsedWordDictionaryEntry;
};

function WordTooltip({
  linkedTo,
  setShowTooltip,
  setTooltipIsClosing,
  tooltipIsClosing,
  dictionaryEntry,
}: WordTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    top: "auto",
    left: "auto",
  });

  const { currentBreakpoint } = useWindowSize();
  const isMobile = currentBreakpoint.isMobile;

  const { currentWord, readings, alternatives, meanings } =
    (dictionaryEntry && formatDictionaryEntry(dictionaryEntry)) || {};

  /**
   * Define tooltip position
   */
  useLayoutEffect(() => {
    function handleResize() {
      if (isMobile) {
        setTooltipPosition({ left: 0 });
        return;
      }

      const position = defineTooltipPosition(
        tooltipRef.current,
        linkedTo.current,
      );

      if (position) setTooltipPosition(position);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [linkedTo, tooltipRef, isMobile]);

  /**
   * Hide tooltip on outside click and keydown
   */
  useEffect(() => {
    function closeTooltip() {
      // trigger closing transition
      setTooltipIsClosing(true);

      document.documentElement.style.overflow = "auto";

      // wait for animation to finish
      tooltipRef.current?.addEventListener("transitionend", () => {
        setShowTooltip(false);
        setTooltipIsClosing(false);
      });
    }

    function handleClick(e: MouseEvent) {
      if (!tooltipRef.current?.contains(e.target as Node)) {
        closeTooltip();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeTooltip();
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="absolute left-0 top-0 h-full w-full">
      {/* Backdrop */}
      <div
        className={tooltipBackgroundStyle({
          isVisible: tooltipPosition.left !== "auto",
          isClosing: tooltipIsClosing,
        })}
      />

      {/* Position wrapper */}
      <div
        ref={tooltipRef}
        style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
        className="fixed bottom-0 left-0 isolate z-30 w-full sm:absolute sm:bottom-auto sm:left-auto sm:w-auto"
      >
        {/* Content panel */}
        {currentWord && (
          <div
            className={tooltipPanelStyle({
              state: tooltipPosition.left !== "auto" ? "visible" : "hidden",
              isClosing: tooltipIsClosing,
            })}
          >
            <div className={tooltipContentWrapperStyle()}>
              {/* Word */}
              <p className="mb-2 text-4xl">{currentWord?.text}</p>

              {/* Tags */}
              <ul className="flex flex-wrap gap-2">
                {readings?.map((reading) => (
                  <li>
                    <Tag theme="secondary">{reading}</Tag>
                  </li>
                ))}

                {currentWord.common && (
                  <li>
                    <Tag theme="primary">Common</Tag>
                  </li>
                )}
              </ul>

              {/* Definitions */}
              {meanings && (
                <ul className="mt-5">
                  {meanings.map((meaning) => (
                    <li className="border-dotted border-copy/30 [&:not(:last-child)]:mb-3 [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:pb-3">
                      <p className="text-xs italic opacity-50">
                        {meaning.tags}
                      </p>
                      <p className="text">{meaning.gloss}</p>
                    </li>
                  ))}
                </ul>
              )}

              {/* Alternatives */}
              {!!alternatives?.length && (
                <ul className="mt-5 flex gap-3">
                  {alternatives?.map((alternative) => (
                    <li>
                      <Tag theme="neutral">{alternative.text}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WordTooltip;
