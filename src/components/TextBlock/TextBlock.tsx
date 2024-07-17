"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { Noto_Sans_JP } from "next/font/google";

import styles from "./TextBlock.module.scss";
import { KuromojiToken } from "kuromojin";
import { Word } from "../Word";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export type TextBlockProps = {
  paragraphRef: (el: HTMLParagraphElement | null) => void;
  isVisible: boolean;
  parsedParagraph: KuromojiToken[];
  children?: ReactNode;
};

function TextBlock({
  paragraphRef,
  isVisible,
  parsedParagraph,
  children,
}: TextBlockProps) {
  const posToSkip = ["助動詞", "記号"];

  const words = useMemo(() => {
    return parsedParagraph.map((word) => {
      const id = crypto.randomUUID();

      if (word.word_type === "UNKNOWN")
        return <span key={id}>{word.surface_form}</span>;
      if (posToSkip.includes(word.pos))
        return <span key={id}>{word.surface_form}</span>;

      return <Word key={id}>{word.surface_form}</Word>;
    });
  }, [parsedParagraph]);

  const hasParsedText = !!words.length;

  return (
    <>
      <p
        ref={paragraphRef}
        tabIndex={hasParsedText ? 0 : undefined}
        role={hasParsedText ? "group" : undefined}
        className={`${notoSansJp.className} ${styles.textBlock} ${
          isVisible ? "coucou" : ""
        } ${parsedParagraph ? styles.parsed : ""}`}
      >
        {hasParsedText && isVisible ? words : children}
      </p>
    </>
  );
}

export default TextBlock;
