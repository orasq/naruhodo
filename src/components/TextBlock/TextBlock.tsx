"use client";

import { ReactNode, useMemo } from "react";
import { KuromojiToken } from "kuromojin";
import { Word } from "../Word";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { Dispatcher } from "@/lib/types/generics.types";
import { tv } from "tailwind-variants";
import { TextBlockTag } from "@/lib/utils/types";
import { useParams } from "next/navigation";
import { BOOKMARK_KEY } from "@/lib/utils/constants";

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
  base: "relative mb-[3em] scroll-mt-6 duration-1000 ease-out motion-safe:transition-opacity",
  variants: {
    state: {
      visible: "opacity-100",
      hidden: "opacity-50",
    },
  },
});

const bookmarkZoneStyle = tv({
  base: [
    "motion-safe:background absolute -inset-3 z-10 rounded-xl border-1 border-dashed border-copy/40 duration-100",
    "hover:bg-surface-light/30",
  ],
  variants: {
    isBookmarked: {
      true: "border-2 border-solid border-copy",
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

  const { slug } = useParams();

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

  if (hasParsedText) {
    console.log({ parsedParagraph });
  }

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
              <div className="absolute left-[0.5em] right-auto top-[-1em] cursor-pointer p-[0.25em] pt-[0.2em] text-xs">
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
