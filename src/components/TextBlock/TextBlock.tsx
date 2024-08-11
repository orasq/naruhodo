"use client";

import { ReactNode, useMemo } from "react";
import { KuromojiToken } from "kuromojin";
import { Word } from "../Word";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { Dispatcher } from "@/lib/types/generics.types";
import { tv } from "tailwind-variants";
import { TextBlockTag } from "@/lib/utils/types";

export type TextBlockProps = {
  blockId: number;
  paragraphRef: (el: HTMLParagraphElement | null) => void;
  parsedParagraph: KuromojiToken[];
  htmlTag: TextBlockTag;
  isVisible: boolean;
  setBookmarked: Dispatcher<number | null>;
  isBookmarked: boolean;
  isBookmarkModeActive: boolean;
  children?: ReactNode;
};

const textBlockStyle = tv({
  base: "relative mb-10 scroll-mt-6 duration-1000 ease-out motion-safe:transition-opacity",
  variants: {
    state: {
      visible: "opacity-100",
      hidden: "opacity-50",
    },
  },
});

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
  const POS_TO_SKIP = ["助動詞", "記号"];

  const words = useMemo(() => {
    return parsedParagraph.map((word) => {
      const id = crypto.randomUUID();

      if (word.word_type === "UNKNOWN")
        return <span key={id}>{word.surface_form}</span>;
      if (POS_TO_SKIP.includes(word.pos))
        return <span key={id}>{word.surface_form}</span>;

      return <Word key={id}>{word.surface_form}</Word>;
    });
  }, [parsedParagraph]);

  const hasParsedText = !!words.length;

  function handleBookmarkClick() {
    setBookmarked(isBookmarked ? null : blockId);

    if (isBookmarked) {
      localStorage.removeItem("bookmarked");
    } else {
      localStorage.setItem("bookmarked", JSON.stringify(blockId));
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
        {/* Bookmark icon */}
        {isBookmarkModeActive && (
          <button
            className="absolute left-[-0.5em] right-auto top-[-2em] cursor-pointer border-0 bg-transparent p-[0.25em] pt-[0.2em] text-xs opacity-50 lg:left-auto lg:right-[calc(100%+8px)] lg:top-0"
            onClick={handleBookmarkClick}
          >
            {isBookmarked ? <IconBookmarkFilled /> : <IconBookmark />}
          </button>
        )}

        {/* Text */}
        {hasParsedText && isVisible ? words : children}
      </Tag>
    </>
  );
}

export default TextBlock;
