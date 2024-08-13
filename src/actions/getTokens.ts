"use server";

import { BatchItem } from "@/hooks/useParseText";
import { getTokenizer, KuromojiToken, tokenize } from "kuromojin";

const DIC_URL = "src/lib/kuromoji/dict";

export const getTokens = async (paragraphs: BatchItem[]) => {
  getTokenizer({ dicPath: DIC_URL });

  const parsedParagraphs = await Promise.all(
    paragraphs.map(async (paragraph) => {
      return {
        ...paragraph,
        parsedText: reduceParsedParagraphs(await tokenize(paragraph.baseText)),
      };
    }),
  );

  return parsedParagraphs;
};

function reduceParsedParagraphs(parsedParagraphs: KuromojiToken[]) {
  return parsedParagraphs.reduce((acc: KuromojiToken[] | [], curr) => {
    if (
      curr.pos === "krkrkr" ||
      (curr.pos === "助動詞" && curr.conjugated_form === "基本形") ||
      (curr.pos === "助動詞" && curr.conjugated_form === "体言接続") ||
      (curr.pos === "助詞" && curr.pos_detail_2 === "連語") ||
      (curr.pos === "助詞" && curr.pos_detail_1 === "接続助詞") ||
      (curr.pos === "動詞" &&
        curr.conjugated_type === "一段" &&
        curr.pos_detail_1 === "非自立")
    ) {
      const prevWord = acc.pop();

      if (!prevWord) return [...acc, curr];

      prevWord.surface_form += curr.surface_form;

      return [...acc, prevWord];
    }

    return [...acc, curr];
  }, []);
}
