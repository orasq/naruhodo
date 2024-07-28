import { getTokens } from "@/actions/getTokens";
import type { ParagraphObject } from "@/components/BookText/BookText";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type QueueItem = number;

export type BatchItem = {
  baseText: string;
  index: number;
};

function useParseText(
  paragraphs: ParagraphObject[],
  setParagraphs: Dispatch<SetStateAction<ParagraphObject[]>>
) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [batch, setBatch] = useState<BatchItem[]>([]);

  const canProcessNewBatch = useRef(true);

  // Ref to keep track of the latest queue state (useful in isInQueue to solve closure issue)
  // TODO - there's probably a better way to do this
  const queueRef = useRef(queue);

  useEffect(() => {
    queueRef.current = queue;

    // Debounce before handling the queue
    // TODO - there's probably a better way to do this
    const timeout = setTimeout(() => {
      if (canProcessNewBatch.current) handleQueue();
    }, 800);

    return () => clearTimeout(timeout);
  }, [queue, canProcessNewBatch]);

  // Process batch
  useEffect(() => {
    if (!batch.length) return;

    (async function handleBatch() {
      canProcessNewBatch.current = false;
      const nextParagraphs = [...paragraphs];
      const parsedText = await getTokens(batch);

      // add parsed text
      parsedText.forEach((paragraph) => {
        nextParagraphs[paragraph.index].parsedText = paragraph.parsedText;
      });

      setParagraphs(nextParagraphs);

      // empty the batch
      setBatch([]);

      canProcessNewBatch.current = true;
    })();
  }, [batch]);

  // Is already inside queue?
  function isInQueue(currIndex: number) {
    const queue = queueRef.current;

    return queue.some((queueItemIndex) => queueItemIndex === currIndex);
  }

  // Add to queue
  function addToQueue(currIndex: number) {
    if (isInQueue(currIndex)) return;

    setQueue((prev) => {
      const newArray = [...prev, currIndex];
      return newArray;
    });
  }

  // Remove from queue
  function removeFromQueue(currIndex: number) {
    setQueue((prev) => {
      const newArray = prev.filter(
        (queueItemIndex) => queueItemIndex !== currIndex
      );
      return newArray;
    });
  }

  // Handle queue
  function handleQueue() {
    if (!queue.length) return;

    // set paragraphs' visibility
    // TODO: refactor to combine this with batch to remove one unnecessary re-render
    const nextParagraphs = paragraphs.map((paragraph, index) => {
      return { ...paragraph, isVisible: queue.includes(index) };
    });

    setParagraphs(nextParagraphs);

    // define items needing to have its text parsed
    const itemsToProcess = paragraphs.reduce(
      (acc: BatchItem[], curr: ParagraphObject, currIndex: number) => {
        // if not in queue, skip
        if (!isInQueue(currIndex)) return acc;

        // if already has parsed text, skip
        if (curr.parsedText.length) return acc;

        return [...acc, { baseText: curr.baseText, index: currIndex }];
      },
      [] as BatchItem[]
    );

    setBatch(itemsToProcess);

    // empty the queue
    setQueue([]);
  }

  return {
    addToQueue,
    removeFromQueue,
    isInQueue,
  };
}

export default useParseText;
