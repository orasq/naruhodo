import { useCallback, useEffect, useRef, useState } from "react";
import { Dispatcher } from "@/lib/types/generics.types";
import type { ParagraphObject } from "@/lib/types/types";

type QueueItem = number;

export type BatchItem = {
  baseText: string;
  index: number;
};

const TOKENIZE_API_URL = process.env.NEXT_PUBLIC_TOKENIZE_API_ENDPOINT;
const QUEUE_DEBOUNCE_TIME = 1000;

function useParseText(
  paragraphs: ParagraphObject[],
  setParagraphs: Dispatcher<ParagraphObject[]>,
) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [visibleParagraphs, setVisibleParagraphs] = useState<QueueItem[]>([]);

  const canProcessNewBatch = useRef(true);

  const processQueue = useCallback(async () => {
    canProcessNewBatch.current = false;

    // queue
    const batchToProcess = getParagraphsFromQueue(queue, paragraphs);
    setQueue([]);

    // batch
    const processedParagraphs =
      (await processBatch(batchToProcess, paragraphs)) ?? paragraphs;

    // visibility
    const newParagraphs = setParagraphsVisibility(
      processedParagraphs,
      visibleParagraphs,
    );

    setParagraphs(newParagraphs);

    canProcessNewBatch.current = true;
  }, [queue]);

  useEffect(() => {
    // Debounce before handling the queue
    const timeout = setTimeout(() => {
      if (canProcessNewBatch.current && queue.length) {
        processQueue();
      }
    }, QUEUE_DEBOUNCE_TIME);

    return () => clearTimeout(timeout);
  }, [queue]);

  return {
    addToQueue: (currIndex: number) =>
      setQueue((prev) => addToQueue(prev, currIndex)),
    removeFromQueue: (currIndex: number) =>
      setQueue((prev) => removeFromQueue(prev, currIndex)),
    isInQueue: (currIndex: number) => isInQueue(queue, currIndex),
    setCurrentParagraphVisibility: (currIndex: number, value: boolean) =>
      setVisibleParagraphs((prev) =>
        setCurrentParagraphVisibility(prev, currIndex, value),
      ),
  };
}

export default useParseText;

/**
 * Utils
 */

function isInQueue(queue: QueueItem[], currIndex: number): boolean {
  return queue.some((queueItemIndex) => queueItemIndex === currIndex);
}

function addToQueue(queue: QueueItem[], currIndex: number): QueueItem[] {
  if (isInQueue(queue, currIndex)) return queue;

  return [...queue, currIndex];
}

function removeFromQueue(queue: QueueItem[], currIndex: number): QueueItem[] {
  return queue.filter((queueItemIndex) => queueItemIndex !== currIndex);
}

function getParagraphsFromQueue(
  queue: QueueItem[],
  paragraphs: ParagraphObject[],
): BatchItem[] {
  if (!queue.length) return [];

  return paragraphs.reduce(
    (acc: BatchItem[], curr: ParagraphObject, currIndex: number) => {
      // if not in queue, skip
      if (!isInQueue(queue, currIndex)) return acc;

      // if it already has parsed text, skip
      if (curr.parsedText.length) return acc;

      return [...acc, { baseText: curr.baseText, index: currIndex }];
    },
    [] as BatchItem[],
  );
}

async function processBatch(batch: BatchItem[], paragraphs: ParagraphObject[]) {
  if (!batch.length) return;

  const nextParagraphs = [...paragraphs];

  if (!TOKENIZE_API_URL) throw new Error("TOKENIZE_API_URL is not set");

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

function setCurrentParagraphVisibility(
  visibleParagraphs: QueueItem[],
  currIndex: number,
  isVisible: boolean,
): QueueItem[] {
  if (isVisible && visibleParagraphs.includes(currIndex))
    return visibleParagraphs;

  if (isVisible) return [...visibleParagraphs, currIndex];

  return visibleParagraphs.filter((item) => item !== currIndex);
}

function setParagraphsVisibility(
  paragraphs: ParagraphObject[],
  visibleParagraphs: QueueItem[],
) {
  return paragraphs.map((paragraph, index) => {
    return { ...paragraph, isVisible: visibleParagraphs.includes(index) };
  });
}
