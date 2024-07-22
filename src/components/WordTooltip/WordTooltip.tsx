import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./WordTooltip.module.scss";

type WordTooltipProps = {
  linkedTo: RefObject<HTMLSpanElement>;
  setShowTooltip: Dispatch<SetStateAction<boolean>>;
  word: React.ReactNode;
};

function WordTooltip({ linkedTo, setShowTooltip, word }: WordTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    top: 0,
    left: 0,
  });

  /**
   * Define tooltip position
   */
  useEffect(() => {
    const position = defineTooltipPosition(
      tooltipRef.current,
      linkedTo.current
    );

    if (position) setTooltipPosition(position);
  }, [linkedTo, tooltipRef]);

  /**
   * Hide tooltip on outside click
   */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!tooltipRef.current?.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={tooltipRef}
      className={`${styles.tooltip} ${
        tooltipPosition.left === 0 ? styles["is-hidden"] : ""
      }`}
      style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
    >
      {word}
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
  const VERTICAL_PADDING = 0;

  // when not enough place to put tooltip on top of word, put it below it
  const isPositionnedBelow = tooltipHeight >= wordTop;

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
  clickedWord: HTMLSpanElement | null
) {
  const articleRef = document.getElementById("articleContent");

  if (!tooltip || !clickedWord || !articleRef) return;

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
