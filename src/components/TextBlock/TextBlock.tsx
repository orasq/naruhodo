"use client";

import { ReactNode, useMemo } from "react";
import { useParams } from "next/navigation";
import { IconBookmarkFilled } from "@tabler/icons-react";
import { Word } from "../Word";
import { Dispatcher } from "@/lib/types/generics.types";
import { bookmarkZoneStyle, textBlockStyle } from "./TextBlock.styles";
import type { TextBlockTag } from "@/lib/types/types";
import { BOOKMARK_KEY } from "@/lib/utils/constants";
import { ParsedWord } from "@/lib/types/dictionary.types";

export type TextBlockProps = {
  blockId: number;
  paragraphRef: (el: HTMLParagraphElement | null) => void;
  parsedParagraph: ParsedWord[];
  htmlTag: TextBlockTag;
  isVisible: boolean;
  setBookmarked: Dispatcher<number | null>;
  isBookmarked: boolean;
  isBookmarkModeActive: boolean;
  children?: ReactNode;
};

function TextBlock({
  blockId,
  paragraphRef,
  parsedParagraph,
  htmlTag,
  isVisible,
  setBookmarked,
  isBookmarked,
  isBookmarkModeActive,
  children,
}: TextBlockProps) {
  const Tag = htmlTag || "p";

  const { slug } = useParams();

  const words = useMemo(() => {
    if (!parsedParagraph) return [];

    return parsedParagraph.map((word) => {
      const id = crypto.randomUUID();

      if (!word.dictionaryEntry?.fullEntry)
        return <span key={id}>{word.text}</span>;

      return (
        <Word key={id} dictionaryEntry={word.dictionaryEntry}>
          {word.text}
        </Word>
      );
    });
  }, [parsedParagraph]);

  const hasParsedText = !!words.length;

  function handleBookmarkClick() {
    setBookmarked(isBookmarked ? null : blockId);

    if (isBookmarked) {
      localStorage.removeItem(BOOKMARK_KEY(slug));
    } else {
      localStorage.setItem(BOOKMARK_KEY(slug), JSON.stringify(blockId));
    }
  }

  return (
    <>
      <Tag
        ref={paragraphRef}
        tabIndex={hasParsedText ? 0 : undefined}
        role={hasParsedText ? "group" : undefined}
        className={textBlockStyle({
          state: hasParsedText ? "visible" : "hidden",
        })}
      >
        {isBookmarkModeActive && (
          <button
            className={bookmarkZoneStyle({ isBookmarked })}
            onClick={handleBookmarkClick}
          >
            {/* Bookmark icon */}
            {isBookmarked && (
              <div className="absolute top-[-1em] right-auto left-[0.5em] cursor-pointer p-[0.25em] pt-[0.2em] text-xs">
                <IconBookmarkFilled />
              </div>
            )}
          </button>
        )}

        {/* Text */}
        {hasParsedText && isVisible ? words : children}
      </Tag>
    </>
  );
}

export default TextBlock;
