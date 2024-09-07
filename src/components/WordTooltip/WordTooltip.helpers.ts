import type {
  FormatedDictionaryEntry,
  ParsedWordDictionaryEntry,
  RawDictionaryEntry,
} from "@/lib/types/types";
import type { TooltipPosition } from "./WordTooltip.types";
import { getDictionaryTag } from "@/lib/utils/functions/getDictionaryTag";

export function defineTooltipPosition(
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

export function formatDictionaryEntry(
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
