"use client";

import { ReactNode } from "react";
import { Noto_Sans_JP } from "next/font/google";

import styles from "./TextBlock.module.scss";
import { KuromojiToken } from "kuromojin";
import { ParsedText } from "../ParsedText";

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
  const hasParsedText = !!parsedParagraph.length;

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
        {hasParsedText && isVisible ? (
          <ParsedText tokens={parsedParagraph} />
        ) : (
          children
        )}
      </p>
    </>
  );
}

export default TextBlock;
