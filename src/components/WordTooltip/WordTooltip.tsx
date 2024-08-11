import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./WordTooltip.module.scss";
import useWindowSize from "@/hooks/useWindowSize";
import { Dispatcher } from "@/lib/types/generics.types";

type WordTooltipProps = {
  linkedTo: RefObject<HTMLSpanElement>;
  setShowTooltip: Dispatcher<boolean>;
  setTooltipIsClosing: Dispatcher<boolean>;
  tooltipIsClosing: boolean;
  word: React.ReactNode;
};

function WordTooltip({
  linkedTo,
  setShowTooltip,
  setTooltipIsClosing,
  tooltipIsClosing,
  word,
}: WordTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });

  const { currentBreakpoint } = useWindowSize();
  const isMobile = currentBreakpoint.isMobile;

  /**
   * Define tooltip position
   */
  useLayoutEffect(() => {
    function handleResize() {
      if (isMobile) {
        setTooltipPosition({ top: 0, left: 0 });
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

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`${styles.tooltip} ${tooltipPosition.left !== 0 ? styles["is-visible"] : ""} ${tooltipIsClosing ? styles["is-closing"] : ""}`}
    >
      {/* Background overlay */}
      <div className={styles["tooltip-background"]}></div>

      {/* Position wrapper */}
      <div
        ref={tooltipRef}
        className={`${styles["tooltip-position-wrapper"]}`}
        style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
      >
        {/* Content panel */}
        <div className={`${styles["tooltip-panel"]}`}>
          {word}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium
          neque modi labore. Eligendi quibusdam perferendis, consectetur aliquam
          est voluptatum a.
        </div>
      </div>
    </div>
  );
}

export default WordTooltip;

/**
 * Utils functions
 */

function calculateTooltipTop({
  tooltipHeight,
  wordTop,
  wordHeight,
}: {
  tooltipHeight: number;
  wordTop: number;
  wordHeight: number;
}) {
  const VERTICAL_PADDING = 12;

  // when not enough place to put tooltip on top of word, put it below it
  const isPositionnedBelow = tooltipHeight + VERTICAL_PADDING >= wordTop;

  return isPositionnedBelow
    ? wordTop + window.scrollY + wordHeight + VERTICAL_PADDING
    : wordTop + window.scrollY - tooltipHeight - VERTICAL_PADDING;
}

function calculateTooltipLeft({
  tooltipWidth,
  wordLeft,
  wordWidth,
  articleLeft,
  articleWidth,
}: {
  tooltipWidth: number;
  wordLeft: number;
  wordWidth: number;
  articleLeft: number;
  articleWidth: number;
}) {
  const tooltipDefaultLeft = wordLeft + wordWidth / 2 - tooltipWidth / 2;
  const overflowOnLeft = articleLeft > tooltipDefaultLeft;
  const overflowOnRight =
    articleLeft + articleWidth < tooltipDefaultLeft + tooltipWidth;

  let tooltipLeft: number;

  if (overflowOnLeft) {
    tooltipLeft = articleLeft;
  } else if (overflowOnRight) {
    tooltipLeft = articleLeft + articleWidth - tooltipWidth;
  } else {
    tooltipLeft = tooltipDefaultLeft;
  }

  return tooltipLeft;
}

function defineTooltipPosition(
  tooltip: HTMLDivElement | null,
  clickedWord: HTMLSpanElement | null,
) {
  const articleRef = document.getElementById("articleContent");

  if (!tooltip || !clickedWord || !articleRef) return { top: 0, left: 0 };

  // get elements' dimensions and positions
  const { width: tooltipWidth, height: tooltipHeight } =
    tooltip.getBoundingClientRect();

  const {
    top: wordTop,
    left: wordLeft,
    width: wordWidth,
    height: wordHeight,
  } = clickedWord.getBoundingClientRect();

  const { left: articleLeft, width: articleWidth } =
    articleRef.getBoundingClientRect();

  // calculate tooltip position
  const tooltipTop = calculateTooltipTop({
    tooltipHeight,
    wordTop,
    wordHeight,
  });

  const tooltipLeft = calculateTooltipLeft({
    tooltipWidth,
    wordLeft,
    wordWidth,
    articleLeft,
    articleWidth,
  });

  return { top: tooltipTop, left: tooltipLeft };
}
