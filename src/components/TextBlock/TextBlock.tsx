"use client";

import { ReactNode, useState } from "react";
import { Noto_Sans_JP } from "next/font/google";

import { getTokens } from "@/actions/getTokens";
import styles from "./TextBlock.module.scss";
import { KuromojiToken } from "kuromojin";
import { ParsedText } from "../ParsedText";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

type TextBlockProps = {
  children?: ReactNode;
};

function TextBlock({ children }: TextBlockProps) {
  const [parsedText, setParsedText] = useState<KuromojiToken[] | []>([]);

  async function handleClick() {
    const tokens = await getTokens(children?.toString() || "");

    if (tokens) setParsedText(tokens);
  }

  return (
    <>
      <p className={`${notoSansJp.className} ${styles.textBlock}`}>
        {!!parsedText.length ? <ParsedText tokens={parsedText} /> : children}
      </p>
      <button onClick={handleClick}>click</button>
    </>
  );
}

export default TextBlock;
