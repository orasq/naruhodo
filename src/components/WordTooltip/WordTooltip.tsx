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
    function defineTooltipPosition(
      tooltip: HTMLDivElement | null,
      clickedWord: HTMLSpanElement | null
    ) {
      if (!tooltip || !clickedWord) return;

      // get elements' dimensions and positions
      const { width: tooltipWidth, height: tooltipHeight } =
        tooltip.getBoundingClientRect();

      const {
        top: wordTop,
        left: wordLeft,
        width: wordWidth,
        height: wordHeight,
      } = clickedWord.getBoundingClientRect();

      // when not enough place to put tooltip on top of word, put it below it
      const isPositionnedBelow = tooltipHeight >= wordTop;

      // define tooltip position
      const tooltipTop = isPositionnedBelow
        ? wordTop + window.scrollY + wordHeight
        : wordTop + window.scrollY - tooltipHeight;

      return { top: tooltipTop, left: wordLeft };
    }

    const position = defineTooltipPosition(
      tooltipRef.current,
      linkedTo.current
    );

    if (position) setTooltipPosition(position);
  }, [linkedTo, tooltipRef]);

  /**
   * Hide tooltip on click outside
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
