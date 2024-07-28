import { getTokens } from "@/actions/getTokens";
import type { ParagraphObject } from "@/components/Article/Article";
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
      handleQueue();
    }, 800);

    return () => clearTimeout(timeout);
  }, [queue]);

  // Process batch
  useEffect(() => {
    if (!batch.length) return;

    (async function handleBatch() {
      canProcessNewBatch.current = false;
      const parsedText = await getTokens(batch);

      setParagraphs((prev) => {
        const newArray = [...prev];

        parsedText.forEach((paragraph, index) => {
          newArray[paragraph.index].parsedText = paragraph.parsedText;
          newArray[paragraph.index].isVisible = true;
        });

        return newArray;
      });

      // empty the batch
      setBatch([]);
      canProcessNewBatch.current = true;
    })();
  }, [batch]);

  // Set visibility
  function setVisibility(index: number, isVisible: boolean) {
    setParagraphs((prev) => {
      const newArray = [...prev];
      newArray[index].isVisible = isVisible;
      return newArray;
    });
  }

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
    setVisibility,
  };
}

export default useParseText;
