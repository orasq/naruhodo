import { getTokens } from "@/actions/getTokens";
import type { ParsedParagraph } from "@/app/books/page";

async function useParseText(
  paragraphs: ParsedParagraph[],
  itemIndex: number,
  isIntersecting: boolean
): Promise<ParsedParagraph[]> {
  const newArray = [...paragraphs];

  // Change visibility
  newArray[itemIndex].isVisible = isIntersecting;

  // Parse text
  if (isIntersecting && !paragraphs[itemIndex].parsedText.length) {
    const tokens = await getTokens(paragraphs[itemIndex].baseText);
    newArray[itemIndex].parsedText = tokens;
  }

  return newArray;
}

export default useParseText;
