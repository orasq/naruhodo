"use client";

import { ElementRef, LegacyRef, ReactNode, RefObject, useState } from "react";
import { Noto_Sans_JP } from "next/font/google";

import { getTokens } from "@/actions/getTokens";
import styles from "./TextBlock.module.scss";
import { KuromojiToken } from "kuromojin";
import { ParsedText } from "../ParsedText";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export type TextBlockProps = {
  paragraphRef: (el: HTMLParagraphElement | null) => void;
  children?: ReactNode;
};

function TextBlock({ paragraphRef, children }: TextBlockProps) {
  const [parsedText, setParsedText] = useState<KuromojiToken[] | []>([]);

  async function handleClick() {
    const tokens = await getTokens(children?.toString() || "");

    if (tokens) setParsedText(tokens);
  }

  return (
    <>
      <p
        ref={paragraphRef}
        tabIndex={!!parsedText.length ? 0 : undefined}
        role={!!parsedText.length ? "group" : undefined}
        className={`${notoSansJp.className} ${styles.textBlock}`}
      >
        {!!parsedText.length ? <ParsedText tokens={parsedText} /> : children}
      </p>
      <button onClick={handleClick}>click</button>
    </>
  );
}

export default TextBlock;
