import { LoadingParagraphsContext } from "@/contexts/LoadingParagraphsContext";
import { Dispatcher } from "@/lib/types/generics.types";
import type { BatchItem, ParagraphObject } from "@/lib/types/types";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import parseText from "../lib/utils/functions/parseText";

type QueueItem = number;

const QUEUE_DEBOUNCE_TIME = 1000;

function useScrollQueue(
  paragraphs: ParagraphObject[],
  setParagraphs: Dispatcher<ParagraphObject[]>,
) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [visibleParagraphs, setVisibleParagraphs] = useState<QueueItem[]>([]);

  const { setIsLoading } = useContext(LoadingParagraphsContext);
  const canProcessNewBatch = useRef(true);

  const processQueue = useCallback(async () => {
    canProcessNewBatch.current = false;
    setIsLoading(true);

    // queue
    const batchToProcess = getParagraphsFromQueue(queue, paragraphs);
    setQueue([]);

    // batch
    const processedParagraphs =
      (await parseText(batchToProcess, paragraphs)) ?? paragraphs;

    // visibility
    const newParagraphs = setParagraphsVisibility(
      processedParagraphs,
      visibleParagraphs,
    );

    setParagraphs(newParagraphs);

    canProcessNewBatch.current = true;
    setIsLoading(false);
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

export default useScrollQueue;

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
