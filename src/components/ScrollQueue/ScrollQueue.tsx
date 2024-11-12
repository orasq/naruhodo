/**
 * Extract from "BookText.tsx" to avoid unnecessary re-renders
 */

import { MutableRefObject, useEffect } from "react";
import useScrollQueue from "@/hooks/useScrollQueue";

import type { Dispatcher } from "@/lib/types/generics.types";
import type { ParagraphObject } from "@/lib/types/types";

type ScrollQueueProps = {
  textBlockRefs: MutableRefObject<HTMLParagraphElement[]>;
  paragraphs: ParagraphObject[];
  setParagraphs: Dispatcher<ParagraphObject[]>;
  children: React.ReactNode;
};

function ScrollQueue({
  textBlockRefs,
  paragraphs,
  setParagraphs,
  children,
}: ScrollQueueProps) {
  const {
    addToQueue,
    removeFromQueue,
    isInQueue,
    setCurrentParagraphVisibility,
  } = useScrollQueue(paragraphs, setParagraphs);

  /**
   * Add IntersectionObserver to ascertain if a <TextBlock> is visible on the screen or not.
   * When it's visible and doesn't have any parsed text yet --> add text to queue of text to be parsed
   * When it's not visible and has parsed text --> display "baseText" to limit the amount of DOM elements in the page
   */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        // get entry's index
        const index = textBlockRefs.current.indexOf(
          entry.target as HTMLParagraphElement,
        );

        // remove from queue (if applicable)
        if (!entry.isIntersecting) {
          removeFromQueue(index);

          setCurrentParagraphVisibility(index, false);

          return;
        }

        // add item to queue
        if (!isInQueue(index)) addToQueue(index);

        setCurrentParagraphVisibility(index, true);
      });
    });

    // observe each <TextBlock>
    textBlockRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      textBlockRefs.current.forEach((ref) => {
        observer.unobserve(ref);
      });
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}

export default ScrollQueue;
