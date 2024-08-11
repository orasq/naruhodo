import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { Dispatcher } from "@/lib/types/generics.types";
import { tv } from "tailwind-variants";

type WordTooltipProps = {
  linkedTo: RefObject<HTMLSpanElement>;
  setShowTooltip: Dispatcher<boolean>;
  setTooltipIsClosing: Dispatcher<boolean>;
  tooltipIsClosing: boolean;
  word: React.ReactNode;
};

type TooltipPosition = {
  top?: number | "auto";
  left?: number | "auto";
};

const tooltipBackgroundStyle = tv({
  base: "pointer-events-none fixed inset-0 h-full w-full bg-background opacity-0 transition-opacity",
  variants: {
    isVisible: {
      true: "pointer-events-auto opacity-90",
    },
    isClosing: {
      true: "opacity-0",
    },
  },
});

const tooltipPanelStyle = tv({
  base: [
    "ease-smooth rounded-t-4xl w-full bg-surface-light p-8 text-copy transition-[opacity,transform] duration-1000",
    "sm:w-full sm:max-w-72 sm:rounded-md sm:p-4",
  ],
  variants: {
    state: {
      visible: [
        "translate-y-0 scale-100 opacity-100",
        "sm:translate-y-0 sm:scale-100",
      ],
      hidden: ["translate-y-3/4 opacity-0", "sm:translate-y-5 sm:scale-95"],
    },
    isClosing: {
      true: ["translate-y-3/4 opacity-0", "sm:translate-y-5 sm:scale-95"],
    },
  },
});

function WordTooltip({
  linkedTo,
  setShowTooltip,
  setTooltipIsClosing,
  tooltipIsClosing,
  word,
}: WordTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    top: "auto",
    left: "auto",
  });

  const { currentBreakpoint } = useWindowSize();
  const isMobile = currentBreakpoint.isMobile;

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
    <div className="absolute left-0 top-0 h-full w-full">
      {/* Background overlay */}
      <div
        className={tooltipBackgroundStyle({
          isVisible: tooltipPosition.left !== "auto",
          isClosing: tooltipIsClosing,
        })}
      ></div>

      {/* Position wrapper */}
      <div
        ref={tooltipRef}
        style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
        className="fixed bottom-0 left-0 isolate z-30 w-full sm:absolute sm:bottom-auto sm:left-auto sm:w-auto"
      >
        {/* Content panel */}
        <div
          className={tooltipPanelStyle({
            state: tooltipPosition.left !== "auto" ? "visible" : "hidden",
            isClosing: tooltipIsClosing,
          })}
        >
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
): TooltipPosition {
  const articleRef = document.getElementById("bookContent");

  if (!tooltip || !clickedWord || !articleRef)
    return { top: "auto", left: "auto" };

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
