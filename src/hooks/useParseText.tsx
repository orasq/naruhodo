import { getTokens } from "@/actions/getTokens";
import type { ParsedParagraph } from "@/app/books/page";
import { useEffect, useRef, useState } from "react";

type QueueItem = {
  baseText: string;
  index: number;
};

function useParseText(initialParagraphs: ParsedParagraph[]) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [updatedParagraphs, setUpdatedParagraphs] =
    useState<ParsedParagraph[]>(initialParagraphs);

  // Ref to keep track of the latest queue state (useful for isInQueue)
  const queueRef = useRef(queue);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  //   // Change visibility
  //   newArray[itemIndex].isVisible = isIntersecting;

  //   // Parse text
  //   if (isIntersecting && !paragraphs[itemIndex].parsedText.length) {
  //     const tokens = await getTokens(paragraphs[itemIndex].baseText);
  //     newArray[itemIndex].parsedText = tokens;
  //   }

  //   useEffect(() => {
  //     console.log({ queue });
  //   }, [queue]);

  // Set visibility
  function setVisibility(index: number, isVisible: boolean) {
    setUpdatedParagraphs((prev) => {
      const newArray = [...prev];
      newArray[index].isVisible = isVisible;
      return newArray;
    });
  }

  // Is already inside queue?
  function isInQueue(index: number) {
    const queue = queueRef.current;

    return queue.some((item) => item.index === index);
  }

  // Add to queue
  function addToQueue(paragraph: string, index: number) {
    if (isInQueue(index)) return;

    setQueue((prev) => {
      const newArray = [...prev, { baseText: paragraph, index }];
      return newArray;
    });
  }

  // Remove from queue
  function removeFromQueue(index: number) {
    setQueue((prev) => {
      const newArray = prev.filter((item) => item.index !== index);
      return newArray;
    });
  }

  return {
    addToQueue,
    removeFromQueue,
    isInQueue,
    setVisibility,
    updatedParagraphs,
  };
}

export default useParseText;
