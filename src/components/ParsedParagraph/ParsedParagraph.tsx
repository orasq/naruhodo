"use client";

import { KuromojiToken } from "kuromojin";
import { ReactNode, useEffect, useState } from "react";
import { Word } from "../Word";

type ParsedParagraphProps = {
  tokens: KuromojiToken[];
  children?: ReactNode;
};

const posToSkip = ["助動詞", "記号"];

function ParsedParagraph({ tokens }: ParsedParagraphProps) {
  const [words, setWords] = useState<ReactNode[] | []>([]);

  useEffect(() => {
    const text = tokens.map((word) => {
      const id = crypto.randomUUID();
      if (word.word_type === "UNKNOWN")
        return <span key={id}>{word.surface_form}</span>;
      if (posToSkip.includes(word.pos))
        return <span key={id}>{word.surface_form}</span>;

      return <Word key={id}>{word.surface_form}</Word>;
    });

    setWords(text);
  }, [tokens]);

  return <>{words}</>;
}

export default ParsedParagraph;
