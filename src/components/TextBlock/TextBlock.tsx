"use client";

import { ReactNode, useMemo } from "react";
import { KuromojiToken } from "kuromojin";
import styles from "./TextBlock.module.scss";
import { Noto_Sans_JP } from "next/font/google";
import { Word } from "../Word";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export type TextBlockTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type TextBlockProps = {
  paragraphRef: (el: HTMLParagraphElement | null) => void;
  parsedParagraph: KuromojiToken[];
  htmlTag: TextBlockTag;
  isVisible: boolean;
  children?: ReactNode;
};

function TextBlock({
  paragraphRef,
  parsedParagraph,
  isVisible,
  htmlTag,
  children,
}: TextBlockProps) {
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
  const Tag = htmlTag || "p";

  return (
    <>
      <Tag
        ref={paragraphRef}
        tabIndex={hasParsedText ? 0 : undefined}
        role={hasParsedText ? "group" : undefined}
        className={`${notoSansJp.className} ${styles.textBlock} ${
          hasParsedText ? styles.parsed : ""
        }`}
      >
        {hasParsedText && isVisible ? words : children}
      </Tag>
    </>
  );
}

export default TextBlock;
