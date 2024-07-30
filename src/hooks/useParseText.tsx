import { getTokens } from "@/actions/getTokens";
import type { ParagraphObject } from "@/components/BookText/BookText";
import { Dispatcher } from "@/lib/types/generics.types";
import { useCallback, useEffect, useRef, useState } from "react";

type QueueItem = number;

export type BatchItem = {
  baseText: string;
  index: number;
};

function useParseText(
  paragraphs: ParagraphObject[],
  setParagraphs: Dispatcher<ParagraphObject[]>
) {
  const [queue, setQueue] = useState<QueueItem[]>([]);

  const canProcessNewBatch = useRef(true);

  const processQueue = useCallback(async () => {
    canProcessNewBatch.current = false;

    const batchToProcess = getParagraphsFromQueue(queue, paragraphs);
    setQueue([]);

    const nextParagraphs = await processBatch(batchToProcess, paragraphs);
    setParagraphs(nextParagraphs ?? paragraphs);

    canProcessNewBatch.current = true;
  }, [queue]);

  useEffect(() => {
    // Debounce before handling the queue
    const timeout = setTimeout(() => {
      if (canProcessNewBatch.current && queue.length) processQueue();
    }, 800);

    return () => clearTimeout(timeout);
  }, [queue]);

  return {
    addToQueue: (currIndex: number) =>
      setQueue((prev) => addToQueue(prev, currIndex)),
    removeFromQueue: (currIndex: number) =>
      setQueue((prev) => removeFromQueue(prev, currIndex)),
    isInQueue: (currIndex: number) => isInQueue(queue, currIndex),
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
  paragraphs: ParagraphObject[]
): BatchItem[] {
  if (!queue.length) return [];

  return paragraphs.reduce(
    (acc: BatchItem[], curr: ParagraphObject, currIndex: number) => {
      // if not in queue, skip
      if (!isInQueue(queue, currIndex)) return acc;

      // if already has parsed text, skip
      if (curr.parsedText.length) return acc;

      return [...acc, { baseText: curr.baseText, index: currIndex }];
    },
    [] as BatchItem[]
  );
}

async function processBatch(batch: BatchItem[], paragraphs: ParagraphObject[]) {
  if (!batch.length) return;

  const nextParagraphs = [...paragraphs];
  const parsedText = await getTokens(batch);

  // add parsed text
  parsedText.forEach((paragraph) => {
    nextParagraphs[paragraph.index].parsedText = paragraph.parsedText;
  });

  return nextParagraphs;
}
