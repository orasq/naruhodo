import { BatchItem, ParagraphObject } from "@/lib/types/types";

const TOKENIZE_API_URL = process.env.NEXT_PUBLIC_TOKENIZE_API_ENDPOINT;

async function parseText(batch: BatchItem[], paragraphs: ParagraphObject[]) {
  if (!batch.length) return;

  if (!TOKENIZE_API_URL) throw new Error("TOKENIZE_API_URL is not set");

  const nextParagraphs = [...paragraphs];

  try {
    const response = await fetch(`${TOKENIZE_API_URL}/api/tokenize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(batch),
    });

    const { parsedText } = await response.json();

    parsedText.forEach((paragraph: any) => {
      nextParagraphs[paragraph.index].parsedText = paragraph.parsedText;
    });

    return nextParagraphs;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default parseText;
