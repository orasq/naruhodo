import { BatchItem } from "@/hooks/useParseText";
import { getTokenizer, tokenize } from "kuromojin";

export async function getTokens(paragraphs: BatchItem[]) {
  window.kuromojin = {
    dicPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict",
  };

  await getTokenizer();

  const parsedParagraphs = await Promise.all(
    paragraphs.map(async (paragraph) => {
      const tokens = await tokenize(paragraph.baseText);

      console.log({ tokens });

      return {
        ...paragraph,
        tokens: tokens,
      };
    }),
  );

  console.log({ paragraphs, parsedParagraphs });

  return parsedParagraphs;
}
