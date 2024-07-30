"use client";

import { ReactNode, useMemo } from "react";
import { KuromojiToken } from "kuromojin";
import styles from "./TextBlock.module.scss";
import { Word } from "../Word";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { Dispatcher } from "@/lib/types/generics.types";

export type TextBlockTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

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
        className={`${styles.textBlock} ${hasParsedText ? styles.parsed : ""}`}
      >
        {/* Bookmark icon */}
        {isBookmarkModeActive && (
          <button
            className={styles["bookmark-button"]}
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
