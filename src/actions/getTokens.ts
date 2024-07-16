"use server";

import { ParsedParagraph } from "@/app/books/page";
import { BatchItem } from "@/hooks/useParseText";
// import kuromoji from "kuromoji";
import { getTokenizer, tokenize } from "kuromojin";

const DIC_URL = "src/lib/kuromoji/dict";

export const getTokens = async (paragraphs: BatchItem[]) => {
  getTokenizer({ dicPath: DIC_URL });

  const parsedParagraphs = await Promise.all(
    paragraphs.map(async (paragraph) => {
      return { ...paragraph, parsedText: await tokenize(paragraph.baseText) };
    })
  );

  return parsedParagraphs;
};
