import { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { Dispatcher } from "@/lib/types/generics.types";
import { tv } from "tailwind-variants";
import {
  DBWord,
  FormatedDictionaryEntry,
  ParsedWordDictionaryEntry,
  RawDictionaryEntry,
  RawKanaEntry,
  RawKanjiEntry,
} from "@/lib/types/types";
import { getDictionaryTag } from "@/lib/utils/functions/getDictionaryTag";
import { Tag } from "../Tag";

type WordTooltipProps = {
  linkedTo: RefObject<HTMLSpanElement>;
  setShowTooltip: Dispatcher<boolean>;
  setTooltipIsClosing: Dispatcher<boolean>;
  tooltipIsClosing: boolean;
  dictionaryEntry?: ParsedWordDictionaryEntry;
};

type TooltipPosition = {
  top?: number | "auto";
  left?: number | "auto";
};

const tooltipBackgroundStyle = tv({
  base: "pointer-events-none fixed inset-0 h-full w-full bg-backdrop opacity-0 transition-opacity",
  variants: {
    isVisible: {
      true: "pointer-events-auto opacity-50",
    },
    isClosing: {
      true: "opacity-0",
    },
  },
});

const tooltipPanelStyle = tv({
  base: [
    "no-scrollbar max-h-96 w-full overflow-auto rounded-t-4xl bg-surface-light p-8 text-copy transition-[opacity,transform] duration-1000 ease-smooth",
    "shadow-sm sm:max-h-72 sm:w-max sm:max-w-80 sm:rounded-xl sm:p-6",
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
                    <p className="text-xs italic opacity-50">{meaning.tags}</p>
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
        )}
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

function formatDictionaryEntry(
  dictionaryEntry: ParsedWordDictionaryEntry,
): FormatedDictionaryEntry | undefined {
  const { wordBasicForm, type, fullEntry } = dictionaryEntry;

  if (!fullEntry?.content) return undefined;

  const rawEntry: RawDictionaryEntry = JSON.parse(fullEntry?.content);

  const currentWord =
    type === "kanji"
      ? rawEntry.kanji.find((kanji) => kanji.text === wordBasicForm)
      : rawEntry.kana.find((kana) => kana.text === wordBasicForm);

  const readings = rawEntry.kana.map((kana) => kana.text);

  const alternatives =
    type === "kanji"
      ? rawEntry.kanji.filter((kanji) => kanji.text !== wordBasicForm)
      : rawEntry.kana.filter((kana) => kana.text !== wordBasicForm);

  const meanings = rawEntry.sense.map((item) => ({
    tags: item.partOfSpeech.reduce(
      (acc, curr) => `${acc + getDictionaryTag(curr)}; `,
      "",
    ),
    gloss: item.gloss.reduce((acc, curr) => `${acc + curr.text}; `, ""),
  }));

  return {
    currentWord,
    readings,
    alternatives,
    meanings,
  };
}
